/**
*  @author Vadim Sikora ( http://vxsx.ru )
*  NO COPYRIGHTS, DO WHAT YOU WANT
*  @requires jquery 1.4.4 or higher
*/
(function($){
    $.fn.inputfit = function(options) {
        var settings = $.extend({
            minSize   : 12,
            maxSize   : 24,
            useCurrentSizeAsMax : true
        }, options);

            this.each(function() {
                if ( !$(this).is(':input') ) {
                    return;
                }
                
                var maxSize = settings.maxSize;
                
                if( settings.useCurrentSizeAsMax ) {
                    maxSize = parseFloat( $(this).css('font-size') );
                }

                $(this).bind('keyup', function(event) {
                    var $this   = $(this),
                        cloneId = this.id + '_size-changing-clone',
                        width   = $(this).width();

                    if (!$('#'+cloneId).length)
                    {
                        $('<div></div>', {
                            id  : cloneId,
                            css : {
                                fontSize   : $(this).css('font-size'),
                                position   : 'absolute',
                                left       : '-9999px',
                                fontFamily : $(this).css('font-family')
                            }
                        }).insertAfter(this)
                    }
                    var clone = $('#'+cloneId);
                    clone.text($this.val());

                    var currentFontSize = parseFloat( $this.css('font-size') );

                    if ( clone.width() < width - 10 ) {
                        while ( clone.width() < width - 20 ) {
                            if ( currentFontSize < maxSize ) {
                                currentFontSize += .1;
                            } else {
                                break;
                            }
                            clone.css('font-size', currentFontSize + 'px');
                        }
                        $this.css('font-size', currentFontSize + 'px');

                    } else {

                        while ( clone.width() > width - 20 ) {
                            if ( currentFontSize > settings.minSize ) {
                                currentFontSize -= .1;
                            } else {
                                break;
                            }
                            clone.css('font-size', currentFontSize + 'px');
                        }
                        $this.css('font-size', currentFontSize + 'px');
                    }


                })
        })


        //Chain:
        return this;
    }

})(jQuery);
