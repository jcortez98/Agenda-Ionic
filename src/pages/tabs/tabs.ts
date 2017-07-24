import { Component } from '@angular/core';

import { ContactosPage } from '../contactos/contactos';
import { TareaPage } from '../tarea/tarea';
import { CitaPage } from '../cita/cita';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ContactosPage;
  tab3Root = TareaPage;
  tab4Root = CitaPage
  constructor() {

  }
}
