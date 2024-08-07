import {Injectable, Injector} from '@angular/core';
import {BaseWriteRepository, CommandResult, ODataQueryOptions, PagedListResult, QueryResult} from "@framework";
import {Observable, tap} from "rxjs";

export interface PrivilegeSaveRequest {
  startTime?: string;
  endTime?: string;
  accesses: string[];
}

@Injectable({providedIn: 'root'})
export class UserRepository extends BaseWriteRepository {

  constructor(injector: Injector) {
    super(injector, 'Users');
  }

  override select(query?: ODataQueryOptions): Observable<PagedListResult> {
    return super.select(query);
  }

  search(req: {search: any, code: any}): Observable<PagedListResult> {
    return this.http.get<PagedListResult>(`Search`, {params: req});
  }

  override getAll(): Observable<QueryResult<any[]>> {
    return super.getAll().pipe(tap(res => {
      res.data?.forEach(x => {
        x.text = `${x.name} (${x.username})`;
      })
    }));
  }

  getOwn() {
    return this.http.get<QueryResult>('Own');
  }

  ownChangePassword(req: any) {
    return this.http.post<CommandResult>('Own/ChangePassword', req);
  }

  resetPassword(req: any) {
    return this.http.post<CommandResult>(`${req.id}/ResetPassword`, req);
  }

  editOwn(req: any) {
    return this.http.patch<QueryResult>('Own', req);
  }

  getPrivileges(id: string) {
    return this.http.get<QueryResult<string[]>>(`${id}/Privileges`);
  }

  savePrivileges(id: string, request: PrivilegeSaveRequest) {
    return this.http.post<QueryResult<string[]>>(`${id}/Privileges`, request);
  }

  deActive(req: any) {
    return this.http.post<QueryResult<string[]>>(`${req.id}/DeActive`, req);
  }

  active(req: any) {
    return this.http.post<QueryResult<string[]>>(`${req.id}/Active`, req);
  }

  setMessage(req: any) {
    return this.http.post<QueryResult>(`${req.id}/Message`, req);
  }

}
