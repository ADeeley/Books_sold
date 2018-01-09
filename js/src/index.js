window.onload = function() {
    d3.json('data/authors.json', function(data) {
        let margin = {top: 20, right: 20, 
                      bottom: 50, left: 70}

        let radius = 10,
            width = 800,
            height = 600,
            outerWidth = width + margin.right + margin.left,
            outerHeight = height + margin.top + margin.bottom,
            n = null;

        let chart = d3.select('.chart')
            .attr('width', outerWidth)
            .attr('height', outerHeight)

        let circle = chart.selectAll('circle')
            .data(data)
        .enter().append('circle')
            .attr('class', 'point')
            .attr('cx', (d) => parseInt(d[5]))
            .attr('cy', radius)
            .attr('r', radius)
    })
}
