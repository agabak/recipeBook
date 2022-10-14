import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ShareModule } from "../share/share.module";
import { AuthCompnent } from "./auth.component";

@NgModule({
    declarations: [
        AuthCompnent
    ],
    imports : [
        RouterModule.forChild([
            { path: '', component: AuthCompnent}
        ]),
        ShareModule
    ]
})
export class AuthModule {

}