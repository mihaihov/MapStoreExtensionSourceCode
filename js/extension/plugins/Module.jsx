import {connect} from "react-redux";
import { name } from "../../../config";
import SaveSessionToLocalStorageExtension from "../components/Component"
import {changeMapView, changeZoomLevel } from "@mapstore/actions/map";
import { addLayer, changeLayerParams, changeLayerProperties, clearLayers } from "@mapstore/actions/layers";
import React from 'react';
import Message from "@mapstore/components/I18N/HTML";
import '../../../assets/style.css';


export default {
    name: name,
    component: connect(state => ({
        currentSession :{
            layers: state.layers.flat,
            groups: state.layers.groups && state.layers.groups.length  ? state.layers.groups[0].nodes : [],
            annotations: state.annotations,
            projection: state.map?.present?.projection,
            zoom: state.map?.present?.zoom,
            maxExtent: state.map?.present?.maxExtent,
            center: state.map?.present?.center
        }, entireMap: state.layers,
        locale: state.locale,
        dialogueState: state.toggleDialogue.dialogueState
    }), {
        changeZoomLevel, addLayer, clearLayers,changeMapView, changeLayerProperties, closeDialogue : () => {
            return {
                type: 'CLOSE_DIALOGUE'
            }
        }
    })(SaveSessionToLocalStorageExtension),
    reducers: {
        toggleDialogue : (state = {dialogueState: false}, action) => {
            if(action.type === 'TOGGLE_DIALOGUE')
            {
                return {dialogueState : !state.dialogueState}
            }
            else if(action.type === 'CLOSE_DIALOGUE')
            {
                return {dialogueState : false}
            }
            return state
        }
    },
    containers: {
        Toolbar: {
            name: "SaveSessionToLocalStorageExtension",
            position: 10,
            tooltip: <Message msgId="extension.helpText" />,
            icon: <span class="glyphicon glyphicon-save" />,
            doNotHide: true,
            action: () => {
                return {
                    type: 'TOGGLE_DIALOGUE',
                }
            },
            priority: 1
        },
        BurgerMenu: {
            name: 'SaveSessionToLocalStorageExtension',
            position: 10,
            text: <Message msgId="extension.helpText" />,
            icon: <span class="glyphicon glyphicon-save" />,
            action: () => {
                return {
                    type: 'TOGGLE_DIALOGUE',
                }
            },
            priority: 1,
            alwaysVisible: true,
            doNotHide: true
        },
    }
};


