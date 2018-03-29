$(document).ready(function() {

	//define global vars
	var height = $(window).height();
	var controller = new ScrollMagic.Controller({vertical: false});	
	var startDate = new Date('2018-04-01T00:00:00.000Z');
	var p1 = 'd1.json';
	var p2 = 'd2.json';
	var cur = 0;

	//horizontal scroll with mouse wheel
	$('body').mousewheel(function(e, delta) {
		$(this).scrollLeft(this.scrollLeft + (-delta * 80));
		e.preventDefault();
	});
	
	//shift date ticks on timeline
	for(i = 0; i < 12; i++) {
		$(('#d' + (i + 1))).css('left', (i * 1000 + 'px'));
	}	
	
	//function to populate timeline
	var loadData = function(path) {
		$('#timeline-content').html('');
		$.getJSON(path, function(data) {
			for(i = 0; i < data.dates.length; i++) {				
				//Append html content box
				var html = `
				<div class="content" id="tx">
					<div class="trigger"></div>
					<div class="inner">
						<div class="header">
							<h4 id="tx-title"></h4>
						</div>
						<div class="body" id="tx-body"></div>				
					</div>
				</div>`
				html = html.replace(/x/g, i);			
				$('#timeline-content').append(html);
				
				//Calculate shift from date
				var date = new Date(data.dates[i]['date']);
				var timeDiff = date.getTime() - startDate.getTime();
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
				
				//Populate content box
				$('#t' + i).css('left', diffDays * 32.7 + 'px');
				$('#t' + i + '-title').html(data.dates[i]['title']);
				$('#t' + i + '-body').html(data.dates[i]['body']);
				
				//ScrollMagic animation
				var id = '#t' + i;				
				var tween = TweenMax.to(id + ' .inner', .5, {height: height * .66 + 'px'});				
				var scene = new ScrollMagic.Scene({triggerElement: id + ' .trigger', duration: 300}).setTween(tween).addTo(controller);
			}
		});
	}
	
	$('#swap-btn').click(function() {
		if(cur == 0) {
			loadData(p2);
			$('.page-header h2').text('Density Estimation Method');
			cur = 1;
		} else {
			loadData(p1);
			$('.page-header h2').text('Attribute2Image Method');
			cur = 0;
		}
	});
	
	loadData(p1);
	
});