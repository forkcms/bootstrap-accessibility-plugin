  // DROPDOWN Extension
  // ===============================

  var toggle   = '[data-toggle=dropdown]'
      , $par
      , firstItem
      , focusDelay = 200
      , menus = $(toggle).parent().find('ul').attr('data-ay11-role','menu')
      , lis = menus.find('li')

    // add menuitem ay11 role
    lis.find('a').attr({'data-ay11-role':'menuitem'})
    // add aria attributes to dropdown toggle
    $(toggle).attr({'aria-expanded': 'false'})

    $(toggle).parent()
      // Update aria-expanded when open
      .on('shown.bs.dropdown',function(e){
        $par = $(this)
        var $toggle = $par.find(toggle)
        $toggle.attr('aria-expanded','true')
        $toggle.on('keydown.bs.dropdown', $.proxy(function (ev) {
          setTimeout(function() {
            firstItem = $('.dropdown-menu [data-ay11-role=menuitem]:visible', $par)[0]
            try{ firstItem.focus()} catch(ex) {}
          }, focusDelay)
        }, this))

      })
      // Update aria-expanded when closed
      .on('hidden.bs.dropdown',function(e){
        $par = $(this)
        var $toggle = $par.find(toggle)
        $toggle.attr('aria-expanded','false')
      })

    // Close the dropdown if tabbed away from
    $(document)
      .on('focusout.dropdown.data-api', '.dropdown-menu', function(e){
        var $this = $(this)
          , that = this;
        // since we're trying to close when appropriate,
        // make sure the dropdown is open
        if (!$this.parent().hasClass('open')) {
          return;
        }
        setTimeout(function() {
          if(!$.contains(that, document.activeElement)){
            $this.parent().find('[data-toggle=dropdown]').dropdown('toggle')
          }
        }, 150)
       })
      .on('keydown.bs.dropdown.data-api', toggle + ', [data-ay11-role=menu]' , $.fn.dropdown.Constructor.prototype.keydown);
