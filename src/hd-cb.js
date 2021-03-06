const d3 = require("d3")

const colourValues = require('./maincolours').colourValues

const smpteColours = [...colourValues]
smpteColours[0] = 'lightgrey'

const semiBlack = '#0a0a0a'
const grey15 = '#252525'
const grey40 = '#656565'
const smpteBlue = '#003d67'
const smptePurple = '#3d0076'

function drawHDColourBars (x, y, width, height) {
  const svg = d3.select('#smpte-cb-hd')
  const g = svg.append('g')
  const barWidth = (width * 0.75) / 7
  const cornerBlock = width * 0.125

  /* Background (also bottom left/right squares) */
  g.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', width)
      .attr('height', height)
      .attr('fill', grey15)

  /* TOP SECTION - 60% of HEIGHT */

    // 40% grey background = grey sidebars in top section)
    g.append('rect')
        .attr('x', x)
        .attr('y', y)
        .attr('width', width)
        .attr('height', height * 0.6)
        .attr('fill', grey40)

    // Middle colour bars
    d3.range(7).forEach((d, i) => {
      g.append('rect')
          .attr('x', x + cornerBlock + (d * barWidth))
          .attr('y', y)
          .attr('width', barWidth)
          .attr('height', height * 0.6)
          .attr('fill', smpteColours[i])
    })

  /* MIDDLE SECTION - 20% of HEIGHT. L-R */

    // Top ribbon, first block
    g.append('rect')
    .attr('x', x)
    .attr('y', y + (height * 0.6))
    .attr('width', cornerBlock)
    .attr('height', height * 0.1)
    .attr('fill', 'cyan')

    // Top ribbon, second block
    g.append('rect')
    .attr('x', x + cornerBlock)
    .attr('y', y + (height * 0.6))
    .attr('width', barWidth)
    .attr('height', height * 0.1)
    .attr('fill', smpteBlue)

    // Top ribbon, third block (long grey)
    g.append('rect')
    .attr('x', x + cornerBlock + barWidth)
    .attr('y', y + (height * 0.6))
    .attr('width', barWidth * 6)
    .attr('height', height * 0.1)
    .attr('fill', 'lightgrey')

    // Top ribbon, last block
    g.append('rect')
    .attr('x', x + (width * 0.875))
    .attr('y', y + (height * 0.6))
    .attr('width', cornerBlock)
    .attr('height', height * 0.1)
    .attr('fill', 'blue')

    // Bottom ribbon, first block
    g.append('rect')
    .attr('x', x)
    .attr('y', y + (height * 0.7))
    .attr('width', cornerBlock)
    .attr('height', height * 0.1)
    .attr('fill', 'yellow')

    // Bottom ribbon, second block
    g.append('rect')
    .attr('x', x + cornerBlock)
    .attr('y', y + (height * 0.7))
    .attr('width', barWidth)
    .attr('height', height * 0.1)
    .attr('fill', smptePurple)

    // Bottom ribbon, third block (gradient)

      var gradient = g.append('linearGradient')
       .attr('id', 'hdGradient')
       .attr('x1', '0')
       .attr('x2', '1')
       .attr('y1', '0')
       .attr('y2', '0')

      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', 'black')
        .attr('stop-opacity', 1)

      gradient.append('stop')
          .attr('offset', '100%')
          .attr('stop-color', 'white')
          .attr('stop-opacity', 1)

          g.append('rect')
          .attr('x', x + cornerBlock + barWidth)
          .attr('y', y + (height * 0.7))
          .attr('width', barWidth * 6)
          .attr('height', height * 0.1)
          .attr('fill', 'url(#hdGradient)')

    // Bottom ribbon, last block
    g.append('rect')
    .attr('x', x + (width * 0.875))
    .attr('y', y + (height * 0.7))
    .attr('width', cornerBlock)
    .attr('height', height * 0.1)
    .attr('fill', 'red')

  /* BOTTOM SECTION - 20% of HEIGHT. L-R */

    // First black patch
    g.append('rect')
    .attr('x', x + cornerBlock)
    .attr('y', y + (height * 0.8))
    .attr('width', barWidth * 1.5)
    .attr('height', height * 0.2)
    .attr('fill', semiBlack)

    // White patch
    g.append('rect')
    .attr('x', x + cornerBlock + barWidth * 1.5)
    .attr('y', y + (height * 0.8))
    .attr('width', barWidth * 2)
    .attr('height', height * 0.2)
    .attr('fill', 'white')

    // Second black patch
    g.append('rect')
    .attr('x', x + cornerBlock + barWidth * 3.5)
    .attr('y', y + (height * 0.8))
    .attr('width', barWidth)
    .attr('height', height * 0.2)
    .attr('fill', semiBlack)

    // Sequence of five black bars
    d3.range(5).forEach((d, i) => {
      const smpteBlacks = ['black', semiBlack, '#0e0e0e', semiBlack, '#111111']
      const middleSectionWidth = (width * 0.75)
      const middleLeftBlock = (middleSectionWidth / 7) * 4.5
      g.append('rect')
        .attr('x', x + cornerBlock + middleLeftBlock + d * (barWidth * 1.5) / 5)
        .attr('y', y + (height * 0.8))
        .attr('width', (barWidth * 1.5) / 5)
        .attr('height', height * 0.2)
        .attr('fill', smpteBlacks[i])
    })

    // Third & last black patch
    g.append('rect')
    .attr('x', x + (width * 0.125) + barWidth * 6)
    .attr('y', y + (height * 0.8))
    .attr('width', barWidth)
    .attr('height', height * 0.2)
    .attr('fill', semiBlack)
}

module.exports = drawHDColourBars
