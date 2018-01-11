window.onload = function() {
    // Promises?...
    d3.json('data/authors.json', function(data) {
        let margin = {top: 50, right: 20, 
                      bottom: 80, left: 70}

        let radius = 5,
            width = 800,
            height = 500,
            outerWidth = width + margin.right + margin.left,
            outerHeight = height + margin.top + margin.bottom,
            n = null,
            upperXLimit = Math.max.apply(null, (data.map((author) => parseInt(author[5]))));
            upperYLimit = Math.max.apply(null, (data.map((d) => {
                let booksSold = parseInt(d[1]);
                return d[1].match(/billion/) ? booksSold * 1000 : booksSold;
            })));

            console.log('upper X: ' + upperXLimit)
            console.log('upper Y: ' + upperYLimit)

        let x = d3.scaleLinear()
            .domain([0, upperXLimit])
            .range([0, width]);

        let y = d3.scaleLinear()
            .domain([upperYLimit, 0])
            .range([0, height])

        console.log(y(4000))
        let chart = d3.select('.chart')
            .attr('width', outerWidth)
            .attr('height', outerHeight)
        
        let tooltip = d3.select('.container').append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0)

        let circle = chart.selectAll('circle')
            .data(data)
        .enter().append('circle')
            .attr('class', 'point')
            .attr('cx', (d) => margin.left + x(parseInt(d[5])))
            .attr('cy', (d) => {
                let booksSold = parseInt(d[1]),
                    cy = d[1].match(/billion/) ? y(booksSold * 1000) : y(booksSold);

                return margin.top + cy;
            })
            .attr('r', radius)
            .on('mouseover', (d) => {
                let author = d[0].slice(1 + d[0].length / 2);
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9)
                tooltip.html(author + '<br>Books sold (min):' + d[1]
                             + '<br>Books written: ' + d[5])
                    .style('left', d3.event.pageX + 10)
                    .style('top', d3.event.pageY - 50)
            })
            .on('mouseout', (d) => {
                let author = d[0];
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0)
            })

        chart.append('g') 
            .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
            .call(d3.axisBottom(x));

        chart.append('g') 
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .call(d3.axisLeft(y))

        chart.append('text')
            .attr('x', margin.left + width / 2)
            .attr('y', margin.top / 2 + 20)
            .attr('class', 'textLarge')
            .text('Books sold compared with the number of books written');

        chart.append('text')
            .attr('x', margin.left + width / 2)
            .attr('y', outerHeight - 40)
            .attr('class', 'textMedium')
            .text('Books Written')

        chart.append('text')
            .attr('x', margin.left + width / 2)
            .attr('y', outerHeight -24)
            .attr('class', 'textSmall')
            .text('Data based on the minimum number of books sold.') 

        chart.append('text')
            .attr('x', margin.left + width / 2)
            .attr('y', outerHeight -10)
            .attr('class', 'textSmall')
            .text('Sourced from www.en.wikipedia.org/wiki/List_of_best-selling_fiction_authors')

        chart.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', 0 - (margin.top + height / 2))
            .attr('y', 0)
            .attr('dy', '1em')
            .attr('class', 'textMedium')
            .text('Books Sold (Millions)');
    })
}
