import {memo, useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, Tooltip} from "@mui/material";
import SVGIcon from "../svg/icons";
import MaterialsChart from "../charts/materialsChart";
import useMap from "../../hooks/hooks.map";
import {getMaterialColour} from "../../utilities/utilities";
import SizeChart from "../charts/sizeChart";
import './../../styles/css/fab.css'

export function Menu() {
    const [open, setOpen] = useState(false)
    const [materialOpen, setMaterialOpen] = useState(false)
    const [sizeOpen, setSizeOpen] = useState(false)
    const [filterOpen, setFilterOpen] = useState(false)

    const toggleMenu = () => {
        if (open) {
            setOpen(false)
            setMaterialOpen(false)
            setSizeOpen(false)
            setFilterOpen(false)
            clearFilterData().then();
        } else {
            setOpen(true)
        }
    }

    const {
        filter,
        materials,
        setFilterData,
        clearFilterData
    } = useMap();

    const handleMaterialFilterChange = (e) => {
        setSizeOpen(false);
        setFilterData({type: "Material", value: e.target.value}).then();
    }

    const handleSizeFilterChange = (e) => {
        setMaterialOpen(false);
        setFilterData({type: "Size", value: e.target.value}).then();
    }




    return (
        <>
            <Tooltip title={`${open ? 'Close Menu' : 'Open Menu'}`} placement={"left"}>
                <div className={`fab-menu`}
                     onClick={() => {
                         toggleMenu();
                     }}
                >
                    <div style={{height: '100%', width: '100%'}}>
                        <SVGIcon style={{height: '100%', width: '100%'}} icon={'logo'} fill={'black'}/>
                    </div>
                </div>
            </Tooltip>

            <Tooltip title={`View By Materials`} placement={"left"}>
                <div className={`fab-sub-menu`}
                     style={open ? {opacity: 1, top: 85} : {}}
                     onClick={() => {
                         setSizeOpen(false);
                         setMaterialOpen(!materialOpen)
                     }}
                >
                    <div style={{height: '100%', width: '100%'}}>
                        <SVGIcon style={{height: '100%', width: '100%'}} icon={'material'} fill={'black'}/>
                    </div>
                </div>
            </Tooltip>

            <Tooltip title={`View By Size`} placement={"left"}>
                <div className={`fab-sub-menu`}
                     style={open ? {opacity: 1, top: 140} : {}}
                     onClick={() => {
                         setMaterialOpen(false);
                         setSizeOpen(!sizeOpen)
                     }}
                >
                    <div style={{height: '100%', width: '100%'}}>
                        <SVGIcon style={{height: '100%', width: '100%'}} icon={'size'} fill={'black'}/>
                    </div>
                </div>
            </Tooltip>

            <Tooltip title={`Filter Data`} placement={"left"}>
                <div className={`fab-sub-menu`}
                     style={open ? {opacity: 1, top: 195} : {}}
                     onClick={() => setFilterOpen(!filterOpen)}
                >
                    <div style={{height: '100%', width: '100%'}}>
                        <SVGIcon style={{height: '100%', width: '100%'}} icon={'filter'} fill={'black'}/>
                    </div>
                </div>
            </Tooltip>

            <Tooltip title={`Clear Filter: ${filter.type} is ${filter.value}`} placement={"left"}>
                <div className={`fab-clear-filter-button`}
                     style={filter.value.length > 0 ? {
                         opacity: 1,
                         right: 22,
                         backgroundColor: filter.type === 'Material' ? getMaterialColour(filter.value) : 'white'
                     } : {}}
                     onClick={() => {
                         setMaterialOpen(false);
                         setSizeOpen(false);
                         clearFilterData().then()
                     }}
                >
                    {filter.type === 'Material' &&
                        <div style={{height: '100%', width: '100%'}}>
                            <SVGIcon style={{height: '100%', width: '100%'}} icon={'clear'} fill={'white'}/>
                        </div>
                    }
                    {filter.type === 'Size' &&
                        <div style={{height: '100%', width: '100%'}}>
                            <SVGIcon style={{height: '100%', width: '100%'}} icon={'clear'} fill={'black'}/>
                        </div>
                    }
                </div>
            </Tooltip>


            <div className={`fab-filter-container`}
                 style={filterOpen ? {opacity: 1, top: 22} : {}}
            >
                <div style={{height: '100%', width: '100%', padding: 8}}>
                    {filter.type !== 'Material' &&
                        <FormControl fullWidth sx={{mb: 2}}>
                            <InputLabel id="filter-size-select-label">Size</InputLabel>
                            <Select
                                labelId="filter-size-select-label"
                                id="filter-size-select"
                                value={filter.type === 'Size' ? filter.value : ''}
                                label="Size"
                                onChange={handleSizeFilterChange}
                            >
                                <MenuItem value={'0-50'}>0-50</MenuItem>
                                <MenuItem value={'50-200'}>50-200</MenuItem>
                                <MenuItem value={'200-526'}>200-526</MenuItem>
                            </Select>
                        </FormControl>
                    }

                    {filter.type !== 'Size' &&
                        <>
                            {materials.length > 0 &&
                                <FormControl fullWidth sx={{mb: 2}}>
                                    <InputLabel id="filter-material-select-label">Material</InputLabel>
                                    <Select
                                        labelId="filter-material-select-label"
                                        id="filter-material-select"
                                        value={filter.type === 'Material' ? filter.value : ''}
                                        label="Material"
                                        onChange={handleMaterialFilterChange}
                                    >
                                        {materials.map((material, index) =>
                                            <MenuItem key={`material_${index}`} value={material}>{material}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            }
                        </>
                    }

                    {filter.value.length > 0 &&
                        <FormControl fullWidth>
                            <Button onClick={clearFilterData} variant="outlined"
                                    style={{backgroundColor: 'black', color: 'white'}}>Clear Filter</Button>
                        </FormControl>
                    }
                </div>
            </div>

            <div className={`fab-data-container`}
                 style={
                     (materialOpen || sizeOpen || filter.type!=='')
                     // && filter.value.length === 0
                         ? {opacity: 1, bottom: 22} : {}}
            >
                {(materialOpen || filter.type==='Material') &&
                        <MaterialsChart/>
                }
                {(sizeOpen || filter.type==='Size') &&
                        <SizeChart/>
                }
            </div>
        </>
    )
}

// export default MenuFab
export const MenuFab = memo(Menu);

