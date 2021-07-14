"""
Plaintext File HTML Generator
Author: Sameed Khan, 06/24/2021

Takes as input a CSV file formatted as follows:
    Column 1                Column 2                Column 3
    ----------------        ---------------         ---------------------------------------------------------
    Highlighted Term        Tooltip Content         Title of Ref Link|URL (repeat as many times as necessary)

Also takes as input a TXT file containing the plaintext. All special terms must be bounded like so: __TERM-HERE__
Outputs a new HTML file that can be inserted directly into GSheet for use by the system

Could also later modify to do the GSheet insertion by itself, but at that point, why not just do a database?

Formatting problems that break everything:
    - Since <span> is an inline element, the tooltip content can't be more than one paragraph (nor should it be).
    - Also can't use more than one paragraph since the text insertion doesn't account for line breaks in the text.

Usage (in bash):
>> python htmlConverter.py {CSV-file-path} {TXT-file-path} > {NEW-file-path}.html
"""

from sys import argv as arg
import copy
import csv
import re

csv_path = arg[1]
txt_path = arg[2]
csv_list = []
HTML_REF_LINK = '<img class="img_bullet"><a href="__LINK" class="ref_link" target="_blank">__TEXT</a>'
HTML_TT = ['<span class="special_term">WORD_HERE', '<span class="term_tooltip">TT_CONTENT',
           '<span class="borderline">&nbsp;', '<span class="reference_grid">', '</span></span></span></span>']

# Read the CSV file and get the data for what should be inserted
with open(csv_path) as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        csv_list.append(row)

html_replacement_list = []  # To store all of the assembled html tags into
# Assemble the HTML replacement content with the appropriate content inserts
for tt_term in csv_list:
    # Get all the insert items
    trimmed_list = [elem for elem in tt_term if elem not in ['']]
    term = trimmed_list[0]  # the term being defined itself
    tt_content = trimmed_list[1]  # the text going inside of the tooltip

    ref_links = []  # Don't want it to break if we don't have any ref_links
    if len(trimmed_list) > 2:  # does this tooltip contain any reference links? If so, assemble those too
        ref_links = trimmed_list[2:]  # get all of the reference links and names out

    # Assembling all of the insert items
    html_tooltip_instance = copy.deepcopy(HTML_TT)
    html_tooltip_instance[0] = html_tooltip_instance[0].replace('WORD_HERE', term)
    html_tooltip_instance[1] = html_tooltip_instance[1].replace('TT_CONTENT', tt_content)

    # Assemble ref links by creating tags and appending them into a list
    for link in ref_links:
        temp = link.split('|')
        hyperlink_text = temp[0]
        hyperlink_ref = temp[1]

        tt_ref_link = HTML_REF_LINK
        tt_ref_link = tt_ref_link.replace('__LINK', hyperlink_ref)
        tt_ref_link = tt_ref_link.replace('__TEXT', hyperlink_text)
        html_tooltip_instance.insert(len(html_tooltip_instance)-1,
                                     tt_ref_link)  # NOTE: This assumes only 1 term and 1 content element (only 1 para)

    html_replacement_list.append("".join(html_tooltip_instance))

with open(txt_path, 'r') as text_reader:
    file_str = text_reader.read()
    for html_term in html_replacement_list:
        file_str = re.sub('__(.+?)__', html_term, file_str, 1)

print(file_str)
