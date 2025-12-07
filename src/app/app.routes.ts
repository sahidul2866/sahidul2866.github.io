import { Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DuplicateGroupsComponent } from './duplicates/duplicate-groups/duplicate-groups.component';
import { ApMockComponent } from './ap-mock/ap-mock.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { FeaturesComponent } from './pages/features/features.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { GovernanceComponent } from './pages/governance/governance.component';
import { ApHistoryComponent } from './ap-history/ap-history.component';
import { AdminComponent } from './admin/admin.component';
import { VendorDetailComponent } from './vendors/vendor-detail/vendor-detail.component';
import { VendorListComponent } from './vendors/vendor-list/vendor-list.component';
import { UseCasesComponent } from './pages/use-cases/use-cases.component';
import { CentralVendorsComponent } from './vendors/central-vendors/central-vendors.component';
import { VmExtractionComponent } from './vm-extraction/vm-extraction.component';

export const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'use-cases', component: UseCasesComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'governance', component: GovernanceComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vendors', component: VendorListComponent },
  { path: 'vendors/:id', component: VendorDetailComponent },
  { path: 'central-vendors', component: CentralVendorsComponent },
  { path: 'vm-extraction', component: VmExtractionComponent },
  { path: 'duplicates', component: DuplicateGroupsComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'ap-mock', component: ApMockComponent },
  { path: 'ap-history', component: ApHistoryComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];
