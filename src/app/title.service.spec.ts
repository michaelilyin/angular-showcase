import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {TitleService} from './title.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('TitleService', () => {
  let controller: HttpTestingController;
  let service: TitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    controller = TestBed.get(HttpTestingController);
    service = TestBed.get<TitleService>(TitleService);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send get request for title', () => {
    const spy = jasmine.createSpy();
    service.getTitle().subscribe(spy);

    const req = controller.expectOne('/title');
    req.flush({title: 'test'});

    expect(req.request.method).toEqual('GET');
    expect(spy).toHaveBeenCalledWith('test');
  });
});
