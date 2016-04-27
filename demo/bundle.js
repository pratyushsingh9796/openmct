/*****************************************************************************
 * Open MCT Web, Copyright (c) 2014-2015, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT Web is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT Web includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/
/*global define*/

define([
    "./src/conductor/DemoConductorRepresenter",
    "./src/DemoInitializer",
    "./src/conductor/ConductorServiceDecorator",
    "./src/conductor/DemoTelemetryDecorator",
    "./src/telemetry/DemoTelemetryProvider",
    "./src/DemoModelProvider",
    'text!./res/image-template.html',
    'legacyRegistry'
], function (
    DemoConductorRepresenter,
    DemoInitializer,
    ConductorServiceDecorator,
    DemoTelemetryDecorator,
    DemoTelemetryProvider,
    DemoModelProvider,
    ImageTemplate,
    legacyRegistry
) {
    "use strict";

    legacyRegistry.register("demo", {
        "name": "Live Demo configuration",
        "description": "Adds demo data types, and demo-specific behavior",
        "extensions": {
            "representers": [
                {
                    "implementation": DemoConductorRepresenter,
                    "depends": ["$q", "$compile", "conductorService", "views[]", "throttle", "navigationService"]
                }
            ],
            "components": [
                {
                    "implementation": ConductorServiceDecorator,
                    "provides": "conductorService",
                    "type": "decorator"
                },
                {
                    "implementation": DemoTelemetryProvider,
                    "type": "provider",
                    "provides": "telemetryService",
                    "depends": ["$q", "$timeout"]
                },
                {
                    "implementation": DemoModelProvider,
                    "provides": "modelService",
                    "type": "provider"
                },
            ],
            "runs": [
                {
                    "implementation": DemoInitializer,
                    "depends": [
                        "$timeout",
                        "representers[]",
                        "objectService",
                        "$location"
                    ]
                }
            ],
            "roots": [
                {
                    "id":"demo:realtime",
                    "model": {
                        "type":"demo.collection",
                        "name": "Real-time Telemetry",
                        "composition": [
                            "be3d5df3-cc6e-4b8b-9865-fcd844e55b94",
                            "930dd0b9-9d98-4908-b19c-c1c887117d42"
                        ]
                    },
                    "priority": "preferred"
                },
                {
                    "id":"demo:examples",
                    "model": {
                        "type":"folder",
                        "name": "Examples",
                        "composition": [
                            "a330490d-59ba-4c0c-b046-e5450f29f39b",
                            "934b199f-917e-46a2-9935-3117a9e29218",
                            "88a26104-8bd5-445d-8b57-10b567d2823d",
                            "f3744144-8842-4b7a-bddc-4abbf21315d9",
                            "a32079d0-676b-4e9f-ade7-86d5d2f152fc"
                        ]
                    },
                    "priority": "preferred"
                }
            ],
            "types": [
                {
                    "key": "demo-telemetry",
                    "name": "Spacecraft Telemetry Generator",
                    "glyph": "T",
                    "description": "Mock realtime spacecraft telemetry",
                    "model": {
                        "telemetry": {
                            "period": 100,
                            "multiplier": 10
                        }
                    },
                    "telemetry": {
                        "source": "demo-telemetry",
                        "domains": [
                            {
                                "key": "time",
                                "name": "Time"
                            }
                        ],
                        "ranges": [
                            {
                                "key": "sin",
                                "name": "value"
                            }
                        ]
                    }
                },
                {
                    "key": "image-include",
                    "name": "Image include",
                    "glyph": "ã",
                    "description": "An image include that is resized to fit" +
                    " its container",
                    "views": [
                        "image-view"
                    ],
                    "properties": [
                        {
                            "key": "url",
                            "name": "URL",
                            "control": "textfield",
                            "pattern": "^(ftp|https?)\\:\\/\\/\\w+(\\.\\w+)*(\\:\\d+)?(\\/\\S*)*$",
                            "required": true,
                            "cssclass": "l-input-lg"
                        }
                    ]
                },
                {
                    "key": "demo.plot",
                    "name": "Telemetry Plot",
                    "glyph": "t",
                    "description": "A view that will plot telemetry in a" +
                    " chart.",
                    "priority": 899,
                    "delegates": [
                        "telemetry"
                    ],
                    "views": [
                      "plot"
                    ],
                    "features": "creation",
                    "contains": [
                        {
                            "has": "telemetry"
                        }
                    ],
                    "model": {
                        "composition": []
                    }
                },
                {
                    "name": "Collection",
                    "key": "demo.collection",
                    "glyph": "o",
                    "model": {"composition": []}
                }
            ],
            "licenses": [
                {
                    "name": "Hopscotch",
                    "version": "0.2.5",
                    "author": "linkedin",
                    "description": "Hopscotch is a framework to make it easy" +
                    " for developers to add product tours to their pages.",
                    "license": "license-apache",
                    "website": "http://linkedin.github.io/hopscotch/",
                    "link": "https://raw.githubusercontent.com/linkedin/hopscotch/master/LICENSE"
                }
            ],
            "stylesheets": [
                {
                    "stylesheetUrl": "css/hopscotch.css",
                    priority: "fallback"

                },
                {
                    "stylesheetUrl": "css/tour.css"
                },
                {
                    "stylesheetUrl": "css/image.css"
                }
            ],
            "constants": [
                {
                    "key": "PLOT_FIXED_DURATION",
                    "value": 60000,
                    "comment": "1 minute."
                }
            ],
            "views": [
                {
                    "template": ImageTemplate,
                    "name": "ImageInclude",
                    "type": "image-include",
                    "key": "image-view",
                    "editable": false
                }
            ]
        }
    });
});
