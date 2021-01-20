import Theme0 from './Theme0';
import Theme1 from './Theme1';
import Theme2 from './Theme2';

function Themes({name}){
    let themesComponent = {
        0:Theme0,
        1:Theme1,
        2:Theme2,
    }
    return themesComponent[name]()
}

export default Themes;