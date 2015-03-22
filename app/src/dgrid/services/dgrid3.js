angular.module('inovniReportApp').constant('InfochartSettings', {

	functionalities: {
		menu:{
			left:[
				{
				  title: 'Save',
				  visible: true
				},
				{
				  title: 'aaa',
				  visible: true
				},
				{
				  title: 'bbb',
				  visible: true
				}
			],
			right:[
				{
					id: 'data',
					title: 'Data El.',
					visible: true
				},
				{
					id: 'text',
					title: 'Text El.',
					visible: true
				},
				{
					id: 'chart',
					title: 'Chart',
					visible: true
				},
				{
					id: 'property',
					title: '',
					visible: false
				}
			]
		}
	},
	dataGrid: {
		minColumns: 15,
		minRows: 21,
        axis: 'x',
        _dgId: 2,
	}


});
