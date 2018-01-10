window.onload = function() {
    d3.json('data/authors.json', function(data) {
        let margin = {top: 50, right: 20, 
                      bottom: 50, left: 70}

        let radius = 5,
            width = 800,
            height = 500,
            outerWidth = width + margin.right + margin.left,
            outerHeight = height + margin.top + margin.bottom,
            n = null;

        let x = d3.scaleLinear()
            .domain([0, Math.max.apply(null, (data.map((author) => parseInt(author[5]))))])
            .range([0, width ])

        let chart = d3.select('.chart')
            .attr('width', outerWidth)
            .attr('height', outerHeight)

        let circle = chart.selectAll('circle')
            .data(data)
        .enter().append('circle')
            .attr('class', 'point')
            .attr('cx', (d) => margin.left + x(parseInt(d[5])))
            .attr('cy', (d) => height + margin.top - parseInt(d[2]))
            .attr('r', radius)

        chart.append('g') 
            .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
            .call(d3.axisBottom(x))

        chart.append('text')
            .attr('x', margin.left + width / 2)
            .attr('y', margin.top / 2)
            .attr('class', 'textLarge')
            .text('Books sold compared with the number of books written');

        chart.append('text')
            .attr('x', margin.left + width / 2)
            .attr('y', outerHeight - 10)
            .attr('class', 'textMedium')
            .text('Books Written')

        chart.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', 0 - (margin.top + height / 2))
            .attr('y', 0)
            .attr('dy', '1em')
            .attr('class', 'textMedium')
            .text('Books Sold');
    })
}
