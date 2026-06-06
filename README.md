## link to website: https://meini6512.github.io/Unpaid-Care-Work-AUS/

# Project Report

## 1. Introduction

### 1.1 Main message
Caregiving in Australia is unevenly distributed. Women take on the majority of unpaid care work, including childcare, elder care, and caring for partners, yet this labour is largely invisible in public discourse. Because it is unpaid and unacknowledged, it is rarely counted as work. The time women spend on these responsibilities reduces their ability to participate in paid employment, reinforcing economic inequality.

### 1.2 Purpose of the project
This project aims to make the scale and impact of unpaid care work visible and understandable to a general audience. The goal is to present the facts and data in a way that is accessible and easy to engage with.

### 1.3 Target audience
The project targets Australian adults, as caregiving responsibilities largely fall on this group, with many taking on the role of primary carer.

### 1.4 Site communication and emotional engagement
Following my tutor's feedback, the initial concept was revised. The original version was too data-heavy and lacked an engaging narrative. In response, a fictional character named Mia was introduced, whose personal story unfolds alongside the data visualisations. A hybrid vertical and horizontal scrolling structure encourages users to slow down and engage more with the content. This communication style suits the target audience because it is clear, accessible, and does not require high data literacy. Mia's story is designed to foster empathy and help audiences connect with the realities of unpaid caregiving.

### 1.5 Originality
Existing data on unpaid care work is available but rarely presented in a way that is engaging or easy to interpret. This project closes that gap by pairing data with a emotional narrative.

### 1.6 Code and Visual Inspirations
- Landing page bold typography
- Pictorial chart using highchart library
- Horizontal scroll section with GSAP ScrollTrigger & Locomotive Scroll
- D3.js-based gauge chart in javascript

---

## 2. Design Philosophy

### 2.1 Overall experience and aesthetic
The website uses a hybrid scroll structure. Vertical scroll moves users through the data sections, while horizontal scroll is used for Mia's story, creating a pause that encourages reading. The visual design is minimal and clean, with large photography and a warm brown colour palette to support the emotional weight of the story. Mouse interaction and motion are applied to all charts to keep the audience engaged and to draw attention to key insights.

### 2.2 Visual hierarchy and human-centred design
Typography uses Bayon for the hero title and Charter throughout the rest of the site, supported by colour contrast, spacing, and visual cues that guide users to interact with the charts. These decisions were made to improve readability and accessibility for a general adult audience, many of whom may not be familiar with data visualisations. Every design choice was made to reduce friction and keep the user focused on the story and the data insights.

---

## 3. Visualisation Narrative

### 3.1 Narrative Overview
The narrative opens with Mia's story, establishing her feeling of being stuck at home and wanting to return to work. From there, the website moves into the data, starting with an area chart showing the gender gap in unpaid working hours, followed by a pictorial chart breaking down how carer demographics shift across different life stages. The story then returns to Mia as she struggles to find paid work, followed by a gauge chart examining how long caregiving hours reduce job participation, and a radar chart exploring the reasons people like Mia take on caregiving responsibilities at home. Each insight builds on the last, moving from Mia's emotional struggle to supportive data evidence.

### 3.2 Area Chart
This chart appears directly after the impact statement "Caregiving is universal, but not evenly shared," serving as the first piece of evidence in the data narrative. An area chart was chosen because it can effectively show gaps between two groups over a range of categories. This makes the gender difference in unpaid working hours immediately visible.

The variables mapped are gender, workload category, and the percentage of each group within that category. Annotations are included to direct the user to the key takeaway without requiring them to interpret the chart themselves. Dropdown buttons allow users to switch between genders or show all, giving them a sense of control, while hover interactions on tracemarkers show the specific details behind each data point.

### 3.3 Pictorial Percentage Chart
This chart follows the area chart to add a more specific layer to the gender gap, showing how caregiving roles are distributed across different life stages. Women make up 67.6% of primary carers overall, and this gap is most pronounced in the 35 to 44 age group, which is also Mia's demographic. A "Try This" prompt on the chart directs users to filter to that group, connecting the data directly back to her story.

Filled figure shapes were chosen over a regular bar chart because they make the gender comparison immediately noticeable and more visually engaging. Dropdown filters for carer type and age group, combined with smooth transitions and hover tooltips, allow users to explore the data freely and smoothly. By the end of this section, the audience has moved from understanding that a gap exists to seeing exactly where and who it affects most, setting up the emotional weight of Mia's next story chapter.

### 3.4 Gauge Chart
This chart demonstrates the direct relationship between caregiving hours and employment rates. As users increase the caregiving hours using the buttons, the employment rate gauge drops. It appears after Mia's second story segment, where she struggles to find work, so the data lands as a direct explanation of her situation. Two paired gauge charts were chosen because they allow the user to see both variables update simultaneously, making the cause and effect relationship. The interactive buttons give users control over the input, and the animation of gauges makes the experience more engaging.

By this point in the narrative, the audience has seen the gender gap, understood who carries the burden, and can now see the cost of that imbalance.

### 3.5 Radar Chart
This chart closes the data narrative by exploring why people take on caregiving roles in the first place. The variables mapped are caregiving relationship type (partner, parent, child) and the reasons reported for taking on that role, including family responsibility, emotional obligation, and cost of alternatives etc. These reasons reveal that caregiving is rarely a free choice; it is shaped by social expectation, lack of alternatives, and financial pressure. A radar chart was chosen because it allows multiple reasons and relationship types to be compared, showing patterns across categories. Hover tooltips on markers show specific details.

---

## 4. Data Science

### 4.1 Data Sourcing
All datasets used in this project were sourced from the Australian Bureau of Statistics (ABS) and the Australian Institute of Health and Welfare (AIHW). These sources were chosen for their credibility and the relevance of their data to the Australian context of this project.

### 4.2 Preprocessing data

**Area chart:** The raw data was sourced from the Australian Bureau of Statistics, Census of Population and Housing: Unpaid Work and Care Data Summary, 2021. The dataset provided the total number of males and females across five unpaid working hour categories. Each value was divided by the total for that gender to produce a percentage, allowing the area chart to show the proportion of males and females within each workload category.

**Pictorial chart:** The data was sourced from the Australian Institute of Health and Welfare (AIHW), Informal Carers report, using ABS 2024a data. The dataset provided the proportion of total carers, primary carers, and secondary carers by sex and age group for 2022. No significant transformation was required as the data was already presented in percentages, so I used this cleaned dataset directly in the chart.

**Gauge chart:** The data was sourced from the Australian Bureau of Statistics, Survey of Disability, Ageing and Carers, 2022 (Table 41.3 Proportions). The dataset provided the labour force status of primary carers by average weekly hours spent caring. Only data for persons aged 15 to 64 years was used. The raw data contained some asterisk symbols which were removed during cleaning. The employment rates were then extracted for each of the three caring hour categories: less than 20 hours (71.6%), 20 to 39 hours (62.6%), and 40 hours or more (45.4%), and used directly in the gauge chart.

**Radar chart:** The data was sourced from the Australian Bureau of Statistics, Survey of Disability, Ageing and Carers, 2022 (Table 42.1 Estimates). The dataset provided the reasons primary carers took on their caring role, broken down by sex and relationship to the care recipient. Since the raw data was separated by male and female primary carers, the two groups were combined to produce an overall value for each reason. Each combined value was then divided by the total number of persons within each relationship group to convert it to a percentage. The final dataset shows the proportion of carers reporting each reason across three relationship types: caring for a partner, a parent, and a child.

---

## 5. Usability Evaluation

### 5.1 Goals & Testing Setup
The evaluation targeted three goals: whether users could identify the main insight, whether the charts were self-explanatory, and whether the interactive elements were discoverable without instruction.

Eight participants were recruited. Testing was conducted in person, with participants asked to navigate the website freely while thinking aloud. Observations and verbal feedback were captured via audio recording.

### 5.2 Tasks

| Tasks | Success metrics |
|-------|----------------|
| **Task 1** Start at the beginning of the website and navigate to the first chart. Tell me what you think this website is going to be about based on the title and the opening story scenes. | Participant successfully scrolls to the area chart. Participants accurately identified the core theme. |
| **Task 2** Look at the first visualization and interact with it, explain what this chart is showing you about the differences between men and women. | Participant can correctly identify the "gap" in the higher hours category. Participants read or reference the annotation text box to back up their answer. |
| **Task 3** Locate the section about "Carers in Australia." Use the dropdown menus to explore the "Primary Carers" across different age groups, and identify one change you notice in the chart. | Participant successfully locates and interacts with both the dropdown menus. Participants change the filters without confusion and can identify a change they notice in the chart. |
| **Task 4** Move on to the "Caring hours vs. Employment rate" chart. Use the controls to adjust the time, and explain what happens when you increase or decrease time. | Participant uses the "-Time" and "+Time" buttons to alter the gauge states. Participants understand the correlation between caring hours and employment rate. |

### 5.3 Findings

| Participant | Feedback |
|-------------|----------|
| Participant 1 | Navigation unclear, storytelling lengthy, chart labels confusing, insights need stronger guidance. |
| Participant 2 | Users understood narrative and charts, but interaction cues needed clearer guidance. |
| Participant 3 | Needed clearer chart explanations, stronger visual cues, conclusion, and scroll guidance. |
| Participant 4 | Horizontal scrolling confused users. Charts need clarity, cues, structure, consistent storytelling integration. |
| Participant 5 | Horizontal scroll confusion; unclear charts; weak cues; story-data transitions feel disconnected overall. |
| Participant 6 | Story clear; horizontal scroll confusing; gauge chart clarity issues; need stronger story-data connection. |
| Participant 7 | Horizontal scrolling is engaging but slightly disorienting; some charts are unclear; needs smoother story-data transition. |
| Participant 8 | Horizontal scroll engaging; suggested hybrid scroll; charts understandable after seeing context; stronger visual cues needed. |

Overall, the narrative is engaging, but needs stronger connection to data insights, clearer graph context and labels, and more intuitive interaction cues. Horizontal scrolling is unfamiliar for users and requires better guidance and navigation support.

### 5.4 Design Iterations
After user testing, I improved explanations of the charts and redesigned the scrolling experience into a hybrid layout, using vertical scrolling for data exploration and horizontal scrolling for Mia's narrative. I integrated Mia's story more closely with the graphs to strengthen the connection between narrative and data evidence. Clearer transitions, visual cues, and animations were added to improve user guidance and engagement. Finally, a conclusion section was included to wrap up the story and key insights.
