/**
 * ALOK VIDEO EDITOR - DATA CONFIGURATION
 * 
 * Add your Plugins and Macros here.
 * 
 * Format:
 * {
 *    id: "unique_id",
 *    type: "plugin" OR "macro",
 *    name: "Name of the Tool",
 *    description: "Short description",
 *    file: "filename.zip" or "filename.setting" 
 * }
 */

const projectData = [
    /**
    {
        id: "rect_v3",
        type: "plugin",
        name: "Rectangle_V3",
        description: "Professional Rectangle Animation Tool for Davinci Resolve.",
        file: "Plugin/New folder.zip" // Ensure this file exists in your Plugin folder
    },
     */

//Macros
    
    {
        id: "Rectangle_V3_Macro",
        type: "macro",
        name: "Rectangle_V3",
        description: "Rectangle_V3 have All Direction Control left, Right, Top, Bottom.",
        file: "Macro/Rectangle_V3.zip" // Ensure this file exists in your Macro folder
    },

//Plugins
    
    {
        id: "CinemaBar",
        type: "plugin",
        name: "Cinema_Bar",
        description: "This is not only Cinema_Bar.....",
        file: "Plugin/CinemaBar.zip"
    },
    {
        id: "SafeZoneForReels",
        type: "plugin",
        name: "Safe_Zone_For_Reels",
        description: "Reels Safe Zone (9/16) vertical format",
        file: "Plugin/Safe Zone for Reels.zip" // Ensure this file exists in your Macro folder
    },
    {
        id: "SafeZoneForAD",
        type: "plugin",
        name: "Safe_Zone_For_AD",
        description: "AD Safe Zone (9/16) vertical format",
        file: "Plugin/Safe Zone For AD.zip" // Ensure this file exists in your Macro folder
    },
    // Add more items here...
];













