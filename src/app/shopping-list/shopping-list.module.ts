import { NgModule } from "@angular/core";
import { FormsModule} from "@angular/forms";
import { ShareModule } from "../share/share.module";

import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListRoutesModule } from "./shopping-list-routes.module";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations : [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports : [
        ShoppingListRoutesModule,
        ShareModule
    ]
})
export class shoppingListModule {

}