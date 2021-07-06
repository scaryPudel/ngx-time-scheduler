import {Component, OnInit} from '@angular/core';
import {Item, Period, Section, Events} from '../../projects/ngx-time-scheduler/src/lib/ngx-time-scheduler.model';
import {NgxTimeSchedulerService} from '../../projects/ngx-time-scheduler/src/lib/ngx-time-scheduler.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  eventOutput = '';

  events: Events = new Events();
  periods: Period[];
  sections: Section[];
  items: Item[];
  itemCount = 3;
  sectionCount = 10;
  sections2: Section[];

 
  

  //quartal: Number = Math.abs(moment.diff(qend, 'minutes'));

  constructor(private service: NgxTimeSchedulerService) {
    this.events.SectionClickEvent = (section) => {
      this.eventOutput += '\n' + JSON.stringify(section);
    };
    this.events.SectionContextMenuEvent = (section, {x, y}: MouseEvent) => {
      this.eventOutput += '\n' + JSON.stringify(section) + ',' + JSON.stringify({x, y});
    };
    this.events.ItemClicked = (item) => {
      this.eventOutput += '\n' + JSON.stringify(item);
      this.service.setSections(this.sections2)
      console.log("click")
    };
    this.events.ItemContextMenu = (item, {x, y}: MouseEvent) => {
      this.eventOutput += '\n' + JSON.stringify(item) + ',' + JSON.stringify({x, y});
    };
    this.events.ItemDropped = (item) => {
      this.eventOutput += '\n' + JSON.stringify(item);
    };
   /* this.events.PeriodChange = (start, end) => {
      this.eventOutput += '\n' + JSON.stringify(start) + ',' + JSON.stringify(end);
    };*/
    
    this.events.PeriodChange = (start, end) => {
        //console.log(start);
        //console.log(moment().month());
        //console.log(moment().daysInMonth());
        let currentMonth = moment().month();
        //console.log(moment(currentMonth).daysInMonth());
        this.refresh();
    }
    
    let quarterStart = moment().startOf('quarter');
    let quarterEnd = moment().endOf('quarter');
    let quarterDuration = Math.abs(quarterStart.diff(quarterEnd, 'minutes'));
    let yearStart = moment().startOf('year');
    let yearDudation = Math.abs(yearStart.diff(moment().endOf('year'), 'minutes'));

    let monthDuration = Math.abs((moment().startOf('month')).diff(moment().endOf('month'), 'minutes'));
    //let monthDuration = (moment().daysInMonth()); 
    //console.log(moment().daysInMonth());
    let dayDuration = (Math.abs((moment().startOf('day')).diff(moment().endOf('day'), 'minutes')));
    console.log(dayDuration);
    let weekDuration = (Math.abs((moment().startOf('isoWeek')).diff(moment().endOf('isoWeek'), 'minutes')));
    console.log(weekDuration);
    let week2Duration = (Math.abs((moment().startOf('week')).diff(moment().endOf('week'), 'minutes'))+1);
    console.log(week2Duration);

    this.periods = [
      {
        name: '1 day',
        timeFrameOverall: dayDuration,
        timeFramePeriod: 60 * 1,
        timeFrameHeaders: [
          'DD MMM',
          'HH',
          
          
        ],
        classes: '',
        startDate: moment().startOf('day'),
      },
      {
        name: '3 days',
        timeFramePeriod: (60 * 2),
        timeFrameOverall: (60 * 24 * 2),
        timeFrameHeaders: [
          'Do MMM',
          'HH'
        ],
        classes: '',
      }, {
        name: '1 week',
        timeFrameHeaders: ['D MMM'],
        classes: '',
        timeFrameOverall: 1440*6,
        timeFramePeriod: 1440,
        startDate: moment().startOf('isoWeek'),
      },{
        name: '1 month',
        timeFrameHeaders: ['MMM YYYY', 'DD'],
        classes: '',
        timeFrameOverall: monthDuration,
        timeFramePeriod: 1440,
        startDate: moment().startOf('month'),
      
      },
      {
        name: '1 year',
        timeFrameHeaders: [ 'YYYY','MMM' ],
        classes: '',
        timeFrameOverall: yearDudation,
        timeFramePeriod: yearDudation / 11,
        startDate: yearStart,
        
              },
      {
        name: 'Current Quarter',
        timeFrameHeaders: ['Qo', 'MMM YYYY'],
        classes: '',
        timeFrameOverall: quarterDuration,
        timeFramePeriod: quarterDuration / 2,
        startDate: quarterStart,
      },
      
    
    ];

      this.sections= [
        {
          id: "A1",
          name: "GSO Unit",
          level: 0,
          parentId: null,
        },
        {
          id: "AA",
          name: "EasyS",
          level: 1,
          parentId: "A1",
        },
        {
          id: "AB",
          name: "DTCAL",
          level: 1,
          parentId: "A1",
        },
        {
          id: "B1",
          name: "One.ERP",
          level: 0,
          parentId: null,
        },
        {
          id: "BA",
          name: "BMC",
          level: 1,
          parentId: "B1",
        },
        {
          id: "BB",
          name: "Centuri",
          level: 1,
          parentId: "B1",
        },
        {
          id: "A2S",
          name: "EasyS-Prod",
          level: 2,
          parentId: "AA",
        },
        {
          id: "A2F",
          name: "BMC-Test",
          level: 2,
          parentId: "BA",
        },
        {
          id: "A2S",
          name: "BMC-Dev",
          level: 2,
          parentId: "BA",
        },
        {
          id: "A2S",
          name: "Centuri-OP",
          level: 2,
          parentId: "B1",
        },
      ];

  this.sections2 = [{
    id: "4",
    name: "Test enviroment",
    level: 2,
    parentId: "3",
    open: false,
    visible: false
}]

    this.items = [{
      id: 1,
      sectionID: "1",
      name: 'Item 1',
      start: moment().startOf('day'),
      end: moment().add(5, 'days').endOf('day'),
      classes: '',
      type: 'Frozen Zone'
    }, {
      id: 2,
      sectionID: "3",
      name: 'Item 2',
      start: moment().startOf('day'),
      end: moment().add(4, 'days').endOf('day'),
      classes: '',

    }, {
      id: 3,
      sectionID: "1",
      name: 'Item 3',
      start: moment().add(1, 'days').startOf('day'),
      end: moment().add(3, 'days').endOf('day'),
      classes: ''
    }, {
      id: 4,
      sectionID: "3",
      name: 'Item 4',
      start: moment().add(1, 'days').startOf('day'),
      end: moment().add(3, 'days').endOf('day'),
      classes: ''
    }, {
      id: 5,
      sectionID: "1",
      name: 'Item 5',
      start: moment().add(7, 'days').startOf('day'),
      end: moment().add(8, 'days').endOf('day'),
      classes: ''
    }, {
      id: 6,
      sectionID: "1",
      name: 'Item 6',
      start: moment().subtract(3, 'days').startOf('day'),
      end: moment().subtract(1, 'days').endOf('day'),
      classes: ''
    }, {
      id: 7,
      sectionID: "1",
      name: 'Item 7',
      start: moment().subtract(2, 'days').startOf('day'),
      end: moment().add(2, 'days').endOf('day'),
      classes: ''
    }, {
      id: 8,
      sectionID: "1",
      name: 'Item 8',
      start: moment().add(3, 'days').startOf('day'),
      end: moment().add(7, 'days').endOf('day'),
      classes: ''
    }, {
      id: 9,
      sectionID: "1",
      name: 'Item 9',
      start: moment().subtract(2, 'days').startOf('day'),
      end: moment().add(7, 'days').endOf('day'),
      classes: ''
    }];

  }

  ngOnInit() {
  }

  addItem() {
    this.service.sectionPush({
      id: "4",
      name: "Test enviroment",
      level: 2,
      parentId: "3",
      open: false,
      visible: false
})
  }

  popItem() {
    this.service.itemPop();
  }

  removeItem() {
    this.service.itemRemove(4);
  }

  popSection() {
    this.service.sectionPop();
  }

  removeSection() {
    this.service.sectionRemove(4);
  }

  refresh() {
    this.service.refresh();
  }

}
