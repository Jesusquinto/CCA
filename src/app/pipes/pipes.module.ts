import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuSearch} from './menu-search.pipe';
import { ActoSearchPipe } from './acto-search.pipe';
import { TruncatePipe } from './truncate.pipe'
import { DepartamentoSearchPipe } from './departamento-search.pipe';
import { MunicipioSearchPipe } from './municipio-search.pipe';
import { ContratanteSearchPipe } from './contratante-search.pipe.';
import { TruncateFilePipe } from './truncate-file.pipe';
import { UniqueSearchPipe } from './unique-search.pipe';
import { searchPipe } from './search.pipe';


@NgModule({
    imports: [ 
        CommonModule 
    ],
    declarations: [
      MenuSearch,
      ActoSearchPipe,
      TruncatePipe,
      DepartamentoSearchPipe,
      MunicipioSearchPipe,
      ContratanteSearchPipe,
      TruncateFilePipe,
      UniqueSearchPipe,
      searchPipe
    ],
    exports: [
        TruncateFilePipe,
        MenuSearch,
        ActoSearchPipe,
        TruncatePipe,
        DepartamentoSearchPipe,
        MunicipioSearchPipe,
        ContratanteSearchPipe,
        UniqueSearchPipe,
        searchPipe
    ]
})
export class PipesModule { }
