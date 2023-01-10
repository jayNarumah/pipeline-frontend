import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { CoreConfigService } from '@core/services/config.service';
import { CoreTranslationService } from '@core/services/translation.service';

import { User } from 'app/auth/models';
import { colors } from 'app/colors.const';
import { AuthenticationService } from 'app/auth/service';
import { DashboardService } from 'app/main/dashboard/dashboard.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { locale as english } from 'app/main/dashboard/i18n/en';
import { CountEndpoint } from 'app/api/endpoints/count.endpoint';
import { CountResource } from 'app/api/models/count.model';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EcommerceComponent implements OnInit {
  // Decorator
  @ViewChild('statisticsBarChartRef') statisticsBarChartRef: any;
  @ViewChild('statisticsLineChartRef') statisticsLineChartRef: any;
  @ViewChild('earningChartRef') earningChartRef: any;
  @ViewChild('revenueReportChartRef') revenueReportChartRef: any;
  @ViewChild('budgetChartRef') budgetChartRef: any;
  @ViewChild('statePrimaryChartRef') statePrimaryChartRef: any;
  @ViewChild('stateWarningChartRef') stateWarningChartRef: any;
  @ViewChild('stateSecondaryChartRef') stateSecondaryChartRef: any;
  @ViewChild('stateInfoChartRef') stateInfoChartRef: any;
  @ViewChild('stateDangerChartRef') stateDangerChartRef: any;
  @ViewChild('goalChartRef') goalChartRef: any;

  // Public
  public data: any;
  public currentUser: User;
  public isAdmin: boolean;
  public isClient: boolean;
  public statisticsBar;
  public statisticsLine;
  public revenueReportChartoptions;
  public budgetChartoptions;
  public goalChartoptions;
  public statePrimaryChartoptions;
  public stateWarningChartoptions;
  public stateSecondaryChartoptions;
  public stateInfoChartoptions;
  public stateDangerChartoptions;
  public earningChartoptions;
  public isMenuToggled = false;
  pipeline: number;
  pipelineType: number;
  company: number;

  @BlockUI() blockUI: NgBlockUI;

  // Private
  private $barColor = '#f3f3f3';
  private $trackBgColor = '#EBEBEB';
  private $textMutedColor = '#b9b9c3';
  private $budgetStrokeColor2 = '#dcdae3';
  private $goalStrokeColor2 = '#51e5a8';
  private $textHeadingColor = '#5e5873';
  private $strokeColor = '#ebe9f1';
  private $earningsStrokeColor2 = '#28c76f66';
  private $earningsStrokeColor3 = '#28c76f33';

  /**
   * Constructor
   * @param {AuthenticationService} _authenticationService
   * @param {DashboardService} _dashboardService
   * @param {CoreConfigService} _coreConfigService
   * @param {CoreTranslationService} _coreTranslationService
   */
  constructor(
    private _authenticationService: AuthenticationService,
    private _dashboardService: DashboardService,
    private _coreConfigService: CoreConfigService,
    private _coreTranslationService: CoreTranslationService,
    private countEndpoint: CountEndpoint
  ) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    this.isAdmin = this._authenticationService.isAdmin;
    this.isClient = this._authenticationService.isClient;

    this._coreTranslationService.translate(english);

  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    this.blockUI.start('Loading...');
    this.countEndpoint.companyCount().subscribe({
      next: (response) => {
        this.company = response;
      },
      error: () => this.blockUI.stop
    });

    this.countEndpoint.pipelineCount().subscribe({
      next: (response) => {
        this.pipeline = response;
      },
      error: () => this.blockUI.stop()
    });

    this.countEndpoint.pipelineTypeCount().subscribe({
      next: (response) => {
        this.pipelineType = response;
      },
      error: (error) => this.blockUI.stop()
    });
    this.blockUI.stop()
  }

  /**
   * After View Init
   */
  ngAfterViewInit() {
    // Subscribe to core config changes
    // this._coreConfigService.getConfig().subscribe(config => {
    //   // If Menu Collapsed Changes
    //   if (
    //     (config.layout.menu.collapsed === true || config.layout.menu.collapsed === false) &&
    //     localStorage.getItem('currentUser')
    //   ) {
    //     setTimeout(() => {
    //       if (this.currentUser.role == 'Admin') {
    //         // Get Dynamic Width for Charts
    //         this.isMenuToggled = true;
    // this.statisticsBar.chart.width = this.statisticsBarChartRef?.nativeElement.offsetWidth;
    // this.statisticsLine.chart.width = this.statisticsLineChartRef?.nativeElement.offsetWidth;
    // this.earningChartoptions.chart.width = this.earningChartRef?.nativeElement.offsetWidth;
    // this.revenueReportChartoptions.chart.width = this.revenueReportChartRef?.nativeElement.offsetWidth;
    // this.budgetChartoptions.chart.width = this.budgetChartRef?.nativeElement.offsetWidth;
    // this.goalChartoptions.chart.width = this.goalChartRef?.nativeElement.offsetWidth;
  }
  //       }, 500);
  //     }
  //   });
  // }
}
