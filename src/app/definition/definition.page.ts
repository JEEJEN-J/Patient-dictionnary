import {Component , OnInit} from '@angular/core';
import {NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {EmbedVideoService} from "ngx-embed-video";

@Component({
  selector: 'app-definition' ,
  templateUrl: './definition.page.html' ,
  styleUrls: ['./definition.page.scss'] ,
})
export class DefinitionPage implements OnInit {

  content: any;
  dashboard: any;
  public embedVideo: any;
  link = 'https://youtu.be/Pg83WeGB2CQ';


  constructor(public navController: NavController ,
              private activatedRoute: ActivatedRoute ,
              private embedService: EmbedVideoService) {
  }


  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.content = params;
      console.log("content : " , this.content);
    })
    this.getPropertyById()

    this.embedService.embed(this.link, {
      query: { portrait: 0, color: '333' },
      attr: { width: 600, height: 500 }
    });
  }


  onChange(item: any , title: any) {
    var data = item.params.data;
    var obj = Object.assign({data} , {header: title});
    this.content.params = null;
    this.content.params = obj;
    console.log("changed : " , this.content);
    this.getPropertyById();
  }

  public getPropertyById() {
    this.content.params.data.subtitle.forEach(datas => {
      if (datas.name == this.content.params.header)
        this.link = datas.video;
        console.log('video : ', datas.video)
    })
    this.embedVideo = this.embedService.embed(this.link);
  }


  goBack() {
    this.navController.navigateBack("dashboard" , {queryParams: {title: 'Dashboard patient'}});
  }


}
