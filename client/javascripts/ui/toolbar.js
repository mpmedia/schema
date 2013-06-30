/**
 * Manages ui-toolbar
 */
var Toolbar = Backbone.Model.extend({
    /**
     * Define handlebars templates
     */
    section_template: '#template-ui-toolbar-section',
    
    /**
     * Define toolbar sections
     */
    sections: {
        'left':  'div.ui-toolbar div.section.left',
        'right': 'div.ui-toolbar div.section.right',
        // 'sidebar': 'div.ui-toolbar div.section.sidebar'
    },
    
    
    /**
     * Define empty arrays for toolbar section contents
     */
    section_items: {
        'left':  [],
        'right': []
    },
    
    
    /**
     * Remove all items from section
     *
     * @param string section Section to clear
     *
     * @return void
     */
    clearSection: function (section) {
        this.section_items[section] = [];
        this.renderSection(section);
    },
    
    
    /**
     * Clear all sections
     *
     * @return void
     */
    clear: function () {
        for (section_key in this.sections) {
            this.clearSection(section_key);
        }
        this.render();
    },
    
    
    /**
     * Render section of toolbar
     *
     * @param string section Section to render
     *
     * @return void
     */
    renderSection: function (section) {
        // Get selector and section items:
        var selector = $(this.sections[section]);
        var items = this.section_items[section];
        
        // Render handlebars template:
        var html = _.template($(this.section_template).html(), {
            items: items
        });
        
        // Output HTML:
        selector.html(html);
    },
    
    
    /**
     * Render entire toolbar
     *
     * @return void
     */
    render: function () {
        for (section_key in this.sections) {
            this.renderSection(section_key);
        }
    },
    
    
    /**
     * Adds an icon to the toolbar
     *
     * @param string section Section for the icon to be created under
     * @param string text    Icon text
     * @param string icon    URL for icon
     * @param string url     URL for the icon to link to
     * @param string event   Event name to trigger (optional)
     *
     * @return void
     */
    addItem: function (section, text, icon, url, event) {
        // callback instanceof Function
        this.section_items[section].push({
            text: text,
            icon: icon,
            url: url,
            event: event
        });
        
        this.renderSection(section);
    }
});