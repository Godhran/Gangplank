import Colours from "../styles/colours";

const getMaterialColour = (material) => {
    switch (material) {
        case 'Concrete':
            return Colours.orange;
        case 'Gravel':
            return Colours.yellow;
        case 'Interlock Conc Block':
            return Colours.green;
        case 'Bitumen':
            return Colours.purple;
        case 'Earth':
            return Colours.pink;
        case 'Other':
            return Colours.cyan;
        default :
            return '#000000'
    }
}

export {
    getMaterialColour
}
