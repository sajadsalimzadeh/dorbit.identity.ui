import {Component, Inject, Injector} from '@angular/core';
import {Observable} from "rxjs";
import {ODataQueryOptions, PagedListResult} from "@framework";
import {UserRepository} from "../../repositories/user.repository";
import {BaseDataComponent} from "@panel";
import {USER_OPTION, UserOption} from "./options";

@Component({
  selector: 'page-identity-users',
  templateUrl: 'index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent extends BaseDataComponent {

  constructor(
    injector: Injector,
    repository: UserRepository,
    @Inject(USER_OPTION) protected userOptions: UserOption[]
    ) {
    super(injector, repository);
  }

  protected override loader(query: ODataQueryOptions): Observable<PagedListResult> {
    return this.repository.select(query);
  }
}
