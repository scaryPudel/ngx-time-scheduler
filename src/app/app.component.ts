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
  tooltip: any;
  
    

  constructor(private service: NgxTimeSchedulerService) {
    this.events.SectionClickEvent = (section) => {
      this.eventOutput += '\n' + JSON.stringify(section);
    };
    this.events.SectionContextMenuEvent = (section, {x, y}: MouseEvent) => {
      this.eventOutput += '\n' + JSON.stringify(section) + ',' + JSON.stringify({x, y});
    };
    this.events.ItemClicked = (item) => {
      this.eventOutput += '\n' + JSON.stringify(item);
    // this.setItemType();
     
    };
    this.events.ItemContextMenu = (item, {x, y}: MouseEvent) => {
      this.eventOutput += '\n' + JSON.stringify(item) + ',' + JSON.stringify({x, y});
    };
    this.events.ItemDropped = (item) => {
      this.eventOutput += '\n' + JSON.stringify(item);
    };
  
    
    

    this.events.PeriodChange = (start, end) => {
      
        let currentMonth = moment().month();
        this.refresh();
    }
    
    let quarterStart = moment().startOf('quarter');
    let quarterDuration = Math.abs((moment().startOf('quarter')).diff((moment().endOf('quarter')), 'minutes'));
    let yearDudation = Math.abs((moment().startOf('year')).diff(moment().endOf('year'), 'minutes'));
    let monthDuration = Math.abs((moment().startOf('month')).diff(moment().endOf('month'), 'minutes'));
    let dayDuration = (Math.abs((moment().startOf('day')).diff(moment().endOf('day'), 'minutes')));

   

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
        startDate: moment().startOf('year'),
        
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

    const sortByParentChildRelationship = (inputArray) => {
      const zeroLevel = inputArray.filter((f) => f.level === 0);
      const firstLevel = inputArray.filter((f) => f.level === 1);
      const secondLevel = inputArray.filter((f) => f.level === 2);
    
      const firstSort = firstLevel.reduce(
        (acum, item) => {
          const parentElement = acum.find((f) => f.id === item.parentId);
          const indexOfParent = acum.indexOf(parentElement);
          acum.splice(indexOfParent + 1, 0, item);
          return acum;
        },
        [...zeroLevel]
      );
    
      const secondSort = secondLevel.reduce(
        (acum, item) => {
          const parentElement = acum.find((f) => f.id === item.parentId);
          const indexOfParent = acum.indexOf(parentElement);
          acum.splice(indexOfParent + 1, 0, item);
          return acum;
        },
        [...firstSort]
      );
      return secondSort;
    };
    
    // this.sections = sortByParentChildRelationship([
    //   {
    //     id: "RO_251", 
    //     level: 0, 
    //     name: "KOB", 
    //     parentId: null,
    //     open: true,
    //     visible: true
    //   }, 
    //   {
    //     id: "AG_1", 
    //     level: 1, 
    //     name: "Abili-T", 
    //     parentId: "RO_251",
    //     open: true,
    //     visible: true
    //   }, 
    //   {
    //     id: "AG_30", 
    //     level: 1, 
    //     name: "AProBA", 
    //     parentId: "RO_251",
    //     open: true,
    //     visible: true
    //   }, 
    //   {
    //     id: "AA_10", 
    //     level: 2, 
    //     name: "Abili-T_Abn_LuM", 
    //     parentId: "AG_1",
    //     open: true,
    //     visible: true
    //   }, 
    //   {
    //     id: "AA_11", 
    //     level: 2, 
    //     name: "ABILI-T_WIRK", 
    //     parentId: "AG_1",
    //     open: true,
    //     visible: true
    //   }, 
    //   {
    //     id: "AA_89", 
    //     level: 2, 
    //     name: "AProBA", 
    //     parentId: "AG_30",
    //     open: true,
    //     visible: true
    //   }, 
    //   {
    //     id: "AA_90", 
    //     level: 2, 
    //     name: "AProBA_ETA", 
    //     parentId: "AG_30",
    //     open: true,
    //     visible: true
    //   }
    // ]); 

    this.sections =[
      {
        id: "RO_251", 
        level: 0, 
        name: "KOB", 
        parentId: null,
        open: true,
        visible: true
      }, 
      {
        id: "AG_1", 
        level: 1, 
        name: "Abili-T", 
        parentId: "RO_251",
        open: true,
        visible: true
      }, 
      {
        id: "AG_30", 
        level: 1, 
        name: "AProBA", 
        parentId: "RO_251",
        open: true,
        visible: true
      }, 
      {
        id: "AA_10", 
        level: 2, 
        name: "Abili-T_Abn_LuM", 
        parentId: "AG_1",
        open: true,
        visible: true
      }, 
      {
        id: "AA_11", 
        level: 2, 
        name: "ABILI-T_WIRK", 
        parentId: "AG_1",
        open: true,
        visible: true
      }, 
      {
        id: "AA_89", 
        level: 2, 
        name: "AProBA", 
        parentId: "AG_30",
        open: true,
        visible: true
      }, 
      {
        id: "AA_90", 
        level: 2, 
        name: "AProBA_ETA", 
        parentId: "AG_30",
        open: true,
        visible: true
      }
    ]; 



    this.items = [{
      id: 1,
      sectionID: "AG_1",
      name: 'Item 1',
      start: moment().startOf('day'),
      end: moment().add(5, 'days').endOf('day'),
      classes: '',
      type: '3'
    }, {
      id: 2,
      sectionID: "AA_89",
      name: 'Item 2',
      start: moment().startOf('day'),
      end: moment().add(4, 'days').endOf('day'),
      classes: '',
      type: '1',

    }, {
      id: 3,
      sectionID: "AG_1",
      name: 'Item 3',
      start: moment().add(1, 'days').startOf('day'),
      end: moment().add(3, 'days').endOf('day'),
      classes: '',
      type: '2'
    }, {
      id: 4,
      sectionID: "AA_90",
      name: 'Item 4',
      start: moment().add(1, 'days').startOf('day'),
      end: moment().add(3, 'days').endOf('day'),
      classes: '',
      type: '3'
    }, {
      id: 5,
      sectionID: "AA_89",
      name: 'Item 5',
      start: moment().add(7, 'days').startOf('day'),
      end: moment().add(8, 'days').endOf('day'),
      classes: '',
      type: '3'
    }, {
      id: 6,
      sectionID: "AA_89",
      name: 'Item 6',
      start: moment().subtract(3, 'days').startOf('day'),
      end: moment().subtract(1, 'days').endOf('day'),
      classes: ''
    }, {
      id: 7,
      sectionID: "AA_90",
      name: 'Item 7',
      start: moment().subtract(2, 'days').startOf('day'),
      end: moment().add(2, 'days').endOf('day'),
      classes: ''
    }, {
      id: 8,
      sectionID: "AA_89",
      name: 'Item 8',
      start: moment().add(3, 'days').startOf('day'),
      end: moment().add(7, 'days').endOf('day'),
      classes: ''
    }, {
      id: 9,
      sectionID: "AA_10",
      name: 'Item 9',
      start: moment().subtract(2, 'days').startOf('day'),
      end: moment().add(7, 'days').endOf('day'),
      classes: ''
    }];

  }

  ngOnInit() {
    this.setTooltip();
   
  }

  addItem() {
    this.service.sectionPush({
      id: "4",
      name: "Test enviroment",
      level: 2,
      parentId: "3",
      open: true,
      visible: true
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


  setTooltip() {
    this.tooltip = this.items.map(item => {
      item.tooltip = "" + item.name + " | " + moment(item.start).format('DD/MM/YYYY h:mm:ssa') + " | " + moment(item.end).format('DD/MM/YYYY h:mm:ssa'); 
    this.items.map(item=> {
        switch(item.type){
          case "1" :{
            item.classes = "classic-measure";
            item.type = "Classic Measure"
            break;
          }
          case "2":{
            item.classes = "app-conflict";
            item.type = "App Conflict"
            break;
          }
          case "3":{
            item.classes = "frozen-zone";
            item.type = "Frozen Zone"
            break;
          }
          default: {
            //item.classes = "classic-measure";
           // item.type = "Classic Measure";
            break;
          }
        }
        
  } );  
  } );
       
  }

  
 
}