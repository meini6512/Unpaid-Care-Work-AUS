/* this file contains four charts: area chart, pictorial chart, gauge chart, and radar chart.
 * at the end is the GSAP ScrollTrigger + Locomotive Scroll setup and the scrolling setup for the two horizontal sections. 
 */

/* ────────────────────────────────────────────────────────────────── area chart ──────────────────────────────────────────────────────── */

// i wrote this section to load the data for the area chart as arrays
const hours = ['0 hrs', '< 5 hrs', '5 to 14 hrs', '15 to 29 hrs', '30 hrs+']; // weekly unpaid work hour categories
const maleData = [31.35, 26.64, 29.14, 8.68, 4.19];
const femaleData = [23.85, 16.06, 29.20, 16.95, 13.93];

const maleLabels = maleData.map(num => num + '%');
const femaleLabels = femaleData.map(num => num + '%');

// i wrote this section to create annotations pointing out the gender gap, with styling for readability
const gapAnnotation = {
    x: 3.5, // arrow points between '15 to 29 hrs' and '30 hrs+'
    y: 10, // points at the gap space between the two traces
    text: 'While both genders show a<br>similar peak at 5–14 hours of<br>weekly domestic work, a gender<br>gap emerges at higher workloads.',
    showarrow: true,
    arrowhead: 4,
    ax: 0, // horizontal offset of the arrow from the text box
    ay: -120, // vertical offset of the arrow from the text box
    font: { family: 'Charter, serif', size: 14, color: '#453b30' },
    bgcolor: 'rgba(245, 244, 242, 0.9)',
    bordercolor: '#453b30',
    borderwidth: 1,
    borderpad: 10, // padding inside the annotation box
    align: 'left'
};

const womenAnnotation = {
    x: 4, // arrow points at the '30 hrs+' category
    y: 15, // points at the female value at 30 hrs+
    text: 'In 2021, Australian women<br>were 3.5 times more likely<br>than men to perform 30 or<br>more hours of unpaid work.',
    showarrow: true,
    arrowhead: 4,
    ax: -70, // horizontal offset of the arrow from the text box
    ay: -100, // vertical offset of the arrow from the text box
    font: { family: 'Charter, serif', size: 14, color: '#453b30' },
    bgcolor: 'rgba(245, 244, 242, 0.9)',
    bordercolor: '#453b30',
    borderwidth: 1,
    borderpad: 10, // padding inside the annotation box
    align: 'left'
};

/*
 * i modified this code from the Plotly community forum:
 * https://community.plotly.com/t/bar-or-fill-aera-with-top-as-spline/7108/3
 * creates two area traces for males and females, filled to zero (tozeroy) with smooth spline curves
 */
const traceMales = {
    x: hours,
    y: maleData,
    name: 'Males',
    type: 'scatter',
    mode: 'lines+markers',
    fill: 'tozeroy', // fills the area under the line down to the x-axis
    line: { color: '#195059', shape: 'spline' }, // spline creates a smooth curve between data points
    fillcolor: 'rgba(148, 178, 174, 0.33)',
    hovertemplate: '<b>Group:</b> Males<br>' +
                   '<b>Hours:</b> %{x}<br>' +
                   '<b>Percentage:</b> %{y}%<extra></extra>' // extra tag removes the default trace name from the tooltip
};

const traceFemales = {
    x: hours,
    y: femaleData,
    name: 'Females',
    type: 'scatter',
    mode: 'lines+markers',
    fill: 'tozeroy',
    line: { color: '#69513b', shape: 'spline' },
    fillcolor: 'rgba(176, 129, 55, 0.33)',
    hovertemplate: '<b>Group:</b> Females<br>' +
                   '<b>Hours:</b> %{x}<br>' +
                   '<b>Percentage:</b> %{y}%<extra></extra>'
};

/*
 * i wrote this section to define the layout of the area chart, including background, axes, legend, and annotation.
 * toggle buttons to show all, female only, or male only traces were added using knowledge from class.
 */
const areaLayout = {
    paper_bgcolor: 'rgba(0,0,0,0)', // transparent background for the full plot container
    plot_bgcolor: 'rgba(0,0,0,0)', // transparent background for the inner data area
    margin: { t: 120, b: 80, l: 80, r: 80 }, // extra top margin to fit the annotation and buttons
    font: { family: 'Charter, serif', size: 14, color: '#453b30' },

    xaxis: {
        gridcolor: '#e0e0e0',
        zeroline: false // removes the baseline at y=0 for a cleaner look
    },
    yaxis: {
        title: { text: 'Percentage (%)', font: { size: 14 } },
        gridcolor: '#e0e0e0',
        zeroline: false
    },

    legend: { orientation: 'h', x: 0.5, xanchor: 'center', y: -0.2 }, // centered below the x-axis

    annotations: [gapAnnotation], // default annotation shown on first render

    updatemenus: [{
        buttons: [
            {
                method: 'update',
                label: 'Show All',
                args: [{ visible: [true, true] }, { annotations: [gapAnnotation] }] // shows both traces and the gap annotation
            },
            {
                method: 'update',
                label: 'Show Females',
                args: [{ visible: [false, true] }, { annotations: [womenAnnotation] }] // female trace only with women-specific annotation
            },
            {
                method: 'update',
                label: 'Show Males',
                args: [{ visible: [true, false] }, { annotations: [] }] // male trace only with no annotation
            }
        ],
        direction: 'right', // buttons arranged horizontally
        pad: {'r': 10, 't': 10},
        showactive: true,
        x: 0, // buttons anchored to the left edge
        xanchor: 'left',
        y: 1.25, // positioned above the plot area
        yanchor: 'top',
        bgcolor: '#f5f4f2',
        bordercolor: '#453b30',
        font: { color: '#453b30' }
    }]
};

// utilizing Plotly's graphing libraries, I've made the graphs to be responsive to various screen sizes and hidden the mode bar for a cleaner appearance
// Source: https://plotly.com/javascript/configuration-options/
Plotly.newPlot('areaChart', [traceMales, traceFemales], areaLayout, { responsive: true, displayModeBar: false }); //responsive: true tells Plotly to re-render the chart on viewport resize

/* ────────────────────────────────────────────────────────────────── pictorial chart ──────────────────────────────────────────────────────── */

/*
 * i wrote this section to load the SVG path data for the person silhouettes used in the pictorial chart.
 * svg sources:
 * https://uxwing.com/man-toilet-color-icon/
 * https://uxwing.com/women-toilet-color-icon/
 */
const malePath = "M98.5 0c23.85 0 43.18 19.33 43.18 43.18 0 23.84-19.33 43.17-43.18 43.17S55.32 67.02 55.32 43.18C55.32 19.33 74.65 0 98.5 0zm54.56 162.57v326.67c0 13.13-10.74 23.88-23.87 23.88s-23.87-10.74-23.87-23.88V297.16H92.31v192.08c0 13.13-10.75 23.88-23.87 23.88-13.13 0-23.88-10.74-23.88-23.88V162.57h-8.34V282.6c0 23.95-36.22 23.95-36.22 0V153.42c-.04-21 7.07-35.73 19.94-45.42 22.12-16.68 134.96-16.69 157.1-.02 12.88 9.69 20 24.43 19.96 45.44V282.6c0 23.95-36.22 23.95-36.22 0V162.57h-7.72z";
const femalePath = "M82.08 168.2L30.15 383.23h51.93v104.68c0 13.09 10.71 23.8 23.81 23.8 13.09 0 23.81-10.71 23.81-23.8V383.23h9.38v104.68c0 13.09 10.71 23.8 23.81 23.8 13.09 0 23.8-10.71 23.8-23.8V383.23h49l-49-209.44v-11.66h7.7l.54-.14 36.74 130.7c2.76 9.84 12.98 15.58 22.82 12.82s15.58-12.98 12.82-22.82l-37.23-132.43c-.22-.78-.48-1.54-.79-2.26-4.72-19.64-6.82-31.38-18.69-40.32-22.07-16.62-128.71-16.61-150.78.02C47 117.37 42.34 132.14 36.75 153l.37.09L.69 282.69c-2.76 9.84 2.98 20.06 12.82 22.82 9.84 2.76 20.06-2.98 22.82-12.82l36.75-130.73.68.17h8.32v6.07zM134.07 0c23.78 0 43.06 19.28 43.06 43.06s-19.28 43.05-43.06 43.05c-23.77 0-43.05-19.27-43.05-43.05C91.02 19.28 110.3 0 134.07 0z";

/*
 * i modified this code from a suggestion by Google Gemini to handle the dropdown interactions.
 * tSelect is the carer type dropdown, aSelect is the age group dropdown.
 * the dropdown option values match column names in the CSV so the chart updates to the correct data.
 */
d3.csv("carers_in_aus.csv").then(data => {
  const tSelect = document.getElementById('typeSelect'); // carer type dropdown (primary, secondary, total)
  const aSelect = document.getElementById('ageSelect'); // age group dropdown (under 15, 15-24, etc.)

  const update = () => {
      const maleRow = data.find(d => d.Sex === 'Males' && d['Age group'] === aSelect.value); // finds the matching male row from the CSV
      const femaleRow = data.find(d => d.Sex === 'Females' && d['Age group'] === aSelect.value); // finds the matching female row from the CSV

      /*
       * i modified this code from the Highcharts pictorial chart example:
       * https://www.highcharts.com/demo/highcharts/pictorial-stackshadow
       * adapted colors, fonts, and removed title and credits to match the page design
       */
      Highcharts.chart('pictorialChart', {
          chart: {
            type: 'pictorial',
            backgroundColor: 'transparent'
          },
          title: { text: null }, // no title, the dropdowns and page context make it clear
          credits: { enabled: false }, // removes the default Highcharts credit link

          xAxis: {
              categories: ['Males', 'Females'],
              labels: { style: { color: '#453b30', fontSize: '16px', fontFamily: 'Charter' } },
              lineWidth: 0, // removes the x-axis line for a cleaner look
              min: 0, max: 1, 
          },
          yAxis: {
              visible: false,
              min: 0, max: 100, // constrains scale to 0-100 so percentages map correctly to the full shape height
              stackShadow: {
                enabled: true, // the unfilled portion of the figure shape
                color: 'rgba(69, 59, 48, 0.1)'
              }
          },

          legend: { enabled: false },

          plotOptions: {
              series: {
                  stacking: 'normal',
                  pointPadding: 0, // removes default column spacing so the silhouette renders as a solid shape
                  groupPadding: 0,
                  borderWidth: 0,
                  dataLabels: { enabled: true, format: '{y}%', style: { fontSize: '24px', fontFamily: 'Charter', color: '#453b30' } },
                  paths: [{ definition: malePath }, { definition: femalePath }] // first path maps to males, second to females
              }
          },

          /*
           * i wrote this collaboratively with Google Gemini, which explained how values are passed into series data.
           * parseFloat converts CSV string values to numbers, defaulting to 0 for missing data
           * (no data exists for primary carers under 15)
           */
          series: [{
              name: tSelect.value, // updates dynamically to match the current dropdown selection
              data: [
                  { y: parseFloat(maleRow[tSelect.value]) || 0, color: '#453b30' },
                  { y: parseFloat(femaleRow[tSelect.value]) || 0, color: '#a67c52' }
              ]
          }]
      });

      // show the mia note only for primary carers aged 35-44, since that is her demographic group
      const miaNoteEl = document.getElementById('miaPictorialNote');
      if (tSelect.value === 'Primary carers' && aSelect.value === '35–44') {
          miaNoteEl.classList.add('visible');
      } else {
          miaNoteEl.classList.remove('visible');
      }

      // show the carer type explainer note only on the default view (primary carers, total)
      const NoteEl = document.getElementById('PictorialNote');
      if (tSelect.value === 'Primary carers' && aSelect.value === 'Total') {
          NoteEl.classList.add('visible');
      } else {
          NoteEl.classList.remove('visible');
      }

      // show the interaction prompt only on the default view (primary carers, total)
      const InstructionEl = document.getElementById('PictorialInstruction');
      if (tSelect.value === 'Primary carers' && aSelect.value === 'Total') {
          InstructionEl.classList.add('visible');
      } else {
          InstructionEl.classList.remove('visible');
      }
  };

  // onchange triggers update whenever the user picks a new dropdown option
  // Highcharts built-in animation creates the smooth transition between values automatically
  tSelect.onchange = aSelect.onchange = update;
  update(); // initial render on page load
});


/* ────────────────────────────────────────────────────────────────── interactive gauges ──────────────────────────────────────────────────────── */
 
/*
 * i wrote this section to load the data for gauges, each array element represents a different category of caring hours per week,
 * with the corresponding employment rate for that category
 * hoursVal is used to position the gauge needle
 */
const gaugeData = [
  { label: "Less than 20 hours", hoursVal: 0.5, rate: 71.6 },
  { label: "20 - 39 hours", hoursVal: 1.5, rate: 62.6 },
  { label: "40 hours or more", hoursVal: 2.5, rate: 45.4 }
];
 
let currentIndex = 0; // starts at the first bracket (less than 20 hours), declared with let because it is reassigned on button click
 

//i wrote this collaboratively with Google Gemini, which explained how to update charts dynamically on button interaction.
function updateGauges() { // This function updates both gauges based on the current index
  const current = gaugeData[currentIndex]; 
  document.getElementById('currentLabel').innerText = current.label; // Update the text label between buttons
 
  /*
   * for this section I modified the code from the plotly graphing libraries to create two gauge charts, 
   * one for caring hours and one for employment rate, and styled them to fit the overall design of the page.
   * source: https://plotly.com/javascript/indicator/
   */
  const gaugeLayout = { // shared layout applied to both gauges
      width: 400, height: 350, 
      margin: { t: 50, b: 0, l: 30, r: 30 },
      paper_bgcolor: "transparent",
      font: { color: "#453b30", family: "Charter, serif" }
  };
 
  // Hours Gauge (Left)
  const hoursData = [{
      type: "indicator", // plotly indicator type is used for gauges and numeric displays 
      mode: "gauge",
      value: current.hoursVal, //dot notation, extract numeric values out of the object container
      title: { text: "Caring Hours", font: { size: 18 } },
      gauge: {
          axis: { range: [0, 3], tickvals: [0.5, 1.5, 2.5], ticktext: ["<20", "20-39", "40+"] },
          bar: { color: "#a67c52" },
          steps: [
              { range: [0, 3], color: "#edece9" },
          ]
      }
  }];
 
  // Employment Gauge (Right)
  const employmentData = [{
      type: "indicator",
      mode: "gauge+number",
      value: current.rate,
      title: { text: "Employment Rate", font: { size: 18 } },
      number: { suffix: "%", font: { size: 30, family: "Charter" } },
      gauge: {
          axis: { range: [0, 100] },
          bar: { color: "#a67c52" },
          steps: [
            { range: [0, 100], color: "#edece9" },
          ]
      }
  }];
 
  // on first load use newPlot to initialise the gauges
  // on button clicks use animate so the needle sweeps smoothly (instead of snapping)
  if (!document.getElementById('hoursGauge').data) {
      Plotly.newPlot('hoursGauge', hoursData, gaugeLayout, { responsive: true, displayModeBar: false });
      Plotly.newPlot('employmentGauge', employmentData, gaugeLayout, { responsive: true, displayModeBar: false });
  } else {
      // transition.duration controls the sweep length in milliseconds
      // cubic-in-out easing accelerates then decelerates for a natural feel
      Plotly.animate('hoursGauge', { data: hoursData }, {
          transition: { duration: 600, easing: 'cubic-in-out' },
          frame: { duration: 600, redraw: false }
      });
      Plotly.animate('employmentGauge', { data: employmentData }, {
          transition: { duration: 600, easing: 'cubic-in-out' },
          frame: { duration: 600, redraw: false }
      });
  }
}

/*
 * i wrote this collaboratively with Google Gemini, which explained how to attach click event listeners to buttons.
 * gaugeData has exactly three objects (index 0 to 2), when the index hits 2 (the third and final item), it cannot increment any further.
 */
document.getElementById('increaseTime').addEventListener('click', () => {
  if (currentIndex < 2) {
      currentIndex++;
      updateGauges();
  }
});
 
document.getElementById('decreaseTime').addEventListener('click', () => {
  if (currentIndex > 0) {
      currentIndex--;
      updateGauges();
  }
});
 
updateGauges(); // Initial call to display the default gauge chart on page load
 
/* ────────────────────────────────────────────────────────────────── radar chart ──────────────────────────────────────────────────────── */

// i wrote this section to load the radar chart data from a CSV and strip "%" signs before converting values to numbers
d3.csv("caring_reasons.csv").then(data => {
  const categories = data.map(d => d.Reasons); // the 9 reason categories, used as the angular axis labels
  const cleanData = (arr) => arr.map(val => parseFloat(val.replace('%', ''))); // removes "%" then converts string to number

  // i wrote this section to transform the CSV rows into clean numeric arrays for each care relationship
  const partnerData = cleanData(data.map(d => d['Caring for Partner (%)']));
  const parentData = cleanData(data.map(d => d['Caring for Parent (%)']));
  const childData = cleanData(data.map(d => d['Caring for Child (%)']));
  
  //I wrote this section to create a closed loop in the radar chart by connecting the last data back to the first(this fixed the open gap issue)
  categories.push(categories[0]);
  partnerData.push(partnerData[0]);
  parentData.push(parentData[0]);
  childData.push(childData[0]);

  // i wrote the three traces below, using polar coordinates where r is the value and theta is the category label
  // source: https://plotly.com/javascript/radar-chart/
  const tracePartner = {
      type: 'scatterpolar',
      mode: 'lines+markers',
      r: partnerData,
      theta: categories,
      fill: 'toself',
      name: 'Caring for Partner',
      line: { color: '#40635c' },
      fillcolor: 'rgba(0, 200, 250, 0.49)',
      hovertemplate: '<b>Relationship:</b> Caring for Partner<br>' +
                     '<b>Reason:</b> %{theta}<br>' +
                     '<b>Percentage:</b> %{r}%<extra></extra>'
  };

  const traceParent = {
      type: 'scatterpolar',
      mode: 'lines+markers',
      r: parentData,
      theta: categories,
      fill: 'toself',
      name: 'Caring for Parent',
      line: { color: '#6652a6' },
      fillcolor: 'rgba(187, 167, 252, 0.4)',
      hovertemplate: '<b>Relationship:</b> Caring for Parent<br>' +
                     '<b>Reason:</b> %{theta}<br>' +
                     '<b>Percentage:</b> %{r}%<extra></extra>'
  };

  const traceChild = {
      type: 'scatterpolar',
      mode: 'lines+markers',
      r: childData,
      theta: categories,
      fill: 'toself',
      name: 'Caring for Child',
      line: { color: '#765b0ce4' },
      fillcolor: 'rgba(234, 233, 178, 0.33)',
      hovertemplate: '<b>Relationship:</b> Caring for Child<br>' +
                     '<b>Reason:</b> %{theta}<br>' +
                     '<b>Percentage:</b> %{r}%<extra></extra>'
  };
  // i wrote this section to define the radar chart layout
  const radarLayout = {
      font: { family: 'Charter, serif', color: '#453b30' },
      polar: {
          bgcolor: 'transparent',
          radialaxis: {
              visible: true,
              range: [0, 60], // capped at 60 rather than 100 so differences between data points are more visible
              tickfont: { size: 14, family: 'Charter, serif', color: '#453b30' },
              gridcolor: '#e0e0e0'
          },
          angularaxis: {
              tickfont: { size: 14, family: 'Charter, serif', color: '#453b30' }
          }
        },
      width: 700,
      height: 500,
      margin: { t: 40, b: 40, l: 80, r: 80 },
      paper_bgcolor: 'transparent',

      showlegend: true,
      legend: {
          orientation: 'h', // horizontal legend
          x: 0.5,
          xanchor: 'center',
          y: -0.2,
          font: { family: 'Charter, serif', color: '#453b30' }
      }
  };

  Plotly.newPlot("radarChart", [tracePartner, traceParent, traceChild], radarLayout, { responsive: true, displayModeBar: false });
});

/* ────────────────────────────────────────────────────────────────── site scrolling setup ──────────────────────────────────────────────────────── */

/*
 * i wrote the following section collaboratively with Gemini AI.
 * wrapped everything in "load" so everything runs after the page has fully loaded so all charts are ready
 * before any scroll animations are triggered
 */
window.addEventListener("load", function () {

  gsap.registerPlugin(ScrollTrigger); // registers the ScrollTrigger plugin for use with GSAP animations

  const pageContainer = document.querySelector("#main-container"); 

  // initializes Locomotive Scroll on the main container with smooth scrolling enabled
  const scroller = new LocomotiveScroll({
    el: pageContainer,
    smooth: true
  });

  // updates ScrollTrigger on every scroll event from locomotive
  scroller.on("scroll", ScrollTrigger.update);

  /*
   * by default, GSAP ScrollTrigger reads the browser's native scroll position,
   * but Locomotive Scroll uses its own virtual scroll system instead.
   * scrollerProxy bridges the two so ScrollTrigger knows where the page actually is.
   */
  ScrollTrigger.scrollerProxy(pageContainer, {
    scrollTop(value) {
      return arguments.length
        ? scroller.scrollTo(value, 0, 0) // if a position is given, tell Locomotive to scroll there
        : scroller.scroll.instance.scroll.y; // otherwise, return where Locomotive currently is
    },
    getBoundingClientRect() {
      return { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight }; // tells ScrollTrigger the size of the viewport
    },
    pinType: pageContainer.style.transform ? "transform" : "fixed" // Locomotive moves the page using CSS transform, so pinning must match that
  });

  // refresh ScrollTrigger and update Locomotive after window updates
  ScrollTrigger.addEventListener("refresh", () => scroller.update());

/* ────────────────────────────────────────────────────────────────── hero title entrance ──────────────────────────────────────────────────────── */

// i wrote this section using Gemini AI to animate the hero title when the page first loads.
// each word starts hidden below its container and slides up into view one by one,
// creating a staggered wipe-up effect across the four title words.
const heroWords = gsap.utils.toArray(".hero-word"); // collects all title words into an array so they can be animated together
const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } }); // a timeline chains all animations in sequence with easing

heroTl
    .to(".hero-eyebrow", { opacity: 1, duration: 0.6 }, 0)        // fades in the small label at the top
    .to(heroWords, { y: "0%", duration: 1.1, stagger: 0.1 }, 0.2) // slides each title word up one after another
    .to(".hero-rule", { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, 0.7); // expands the decorative rule line

/* ────────────────────────────────────────────────────────────────── subtitle page reveal animation ──────────────────────────────────────────────────────── */

/*
 * i wrote this collaboratively with Gemini AI to animate the subtitle page when the user scrolls into it.
 * nothing on this page is visible until the user reaches it,
 * at which point the tag, words, and ticker fade and slide in one after another.
 */
const subWords = gsap.utils.toArray(".sub-word"); // collects all subtitle words into an array so they can be staggered

ScrollTrigger.create({
    scroller: pageContainer,
    trigger: ".subtitle-page",
    start: "top 80%", // animation fires when the top of the subtitle page reaches 80% down the viewport
    onEnter: () => {
      gsap.to(".subtitle-tag", { opacity: 1, duration: 0.5 }); // fades in the small label first
      gsap.to(subWords, {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        stagger: 0.12, // each subtitle word slides up slightly after the previous one
        ease: "power3.out",
        delay: 0.1,
      });
      gsap.to(".subtitle-ticker", { opacity: 1, duration: 0.6, delay: 0.8 }); // ticker fades in last, after the words have finished
    },
    once: true, // the animation only plays once and won't repeat on scroll back up.
});

/* ────────────────────────────────────────────────────────────────── hybrid scrolling setup ──────────────────────────────────────────────────────── */

/*
 * i wrote this collaboratively with Gemini AI to set up the two horizontal scroll sections.
 * the 300ms delay gives Plotly, D3, and Highcharts enough time to finish
 * drawing their charts before the scroll animations try to measure the page layout.
 * inspired by: https://codepen.io/cameronknight/pen/qBNvrRQ
 */
setTimeout(() => {

    /*
     * mia's story horizontal pin section.
     * when the user scrolls down into this section, the page locks in place
     * and the slides move sideways instead, creating a horizontal scroll effect.
     * the total sliding distance is the full width of all slides minus one screen width.
     */
    let storyPinWrap = document.querySelector("#storyPin .pin-wrap");
    if (storyPinWrap) {
      let storyHorizontalLength = storyPinWrap.scrollWidth - window.innerWidth; // how far the slides need to travel to reach the last one

      gsap.to("#storyPin .pin-wrap", {
        scrollTrigger: {
          scroller: pageContainer,
          trigger: "#storyPin",
          pin: true, // locks the section in place while the user scrolls
          scrub: true, // ties the slide position directly to scroll progress so it feels draggable
          start: "top top",
          end: () => `+=${storyPinWrap.scrollWidth}`, // scroll distance is equal to the width of the slides
          invalidateOnRefresh: true // recalculates measurements if the window is resized
        },
        x: -storyHorizontalLength, // moves the slides to the left by the calculated distance
        ease: "none"
      });
    }

    /*
     * mia's unemployed story horizontal pin section.
     * same horizontal scroll setup as above, applied to the employment gauge slides.
     */
    let employmentPinWrap = document.querySelector("#employmentPin .pin-wrap");
    if (employmentPinWrap) {
      let employmentHorizontalLength = employmentPinWrap.scrollWidth - window.innerWidth;

      gsap.to("#employmentPin .pin-wrap", {
        scrollTrigger: {
          scroller: pageContainer,
          trigger: "#employmentPin",
          pin: true,
          scrub: true,
          start: "top top",
          end: () => `+=${employmentPinWrap.scrollWidth}`,
          invalidateOnRefresh: true
        },
        x: -employmentHorizontalLength,
        ease: "none"
      });
    }

    // forces GSAP and Locomotive to recalculate after everything has been set up
    ScrollTrigger.refresh();
    scroller.update();

}, 300); // delay in milliseconds before the scroll animations are initialized, allowing charts to render first
});