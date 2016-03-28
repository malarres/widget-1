            var completeForm = false;
            var app = "example1";
            var user = "1";
            var urlserverGlobal = "http://193.27.9.220/widget/";
            //var urlserverGlobal = "http://localhost:7070/widget/";
            var imageuser = "http://lorempixum.com/100/100/nature/1";
            var altimguser = "example of image user";
                    
            
            function processError(e , msg){
                console.error("error");
            }

            function processResponse(res){
                loadValue();
            }
            
            
            function callWebServiceWithComment() {
                //cargar valor de las estrellas para un idParticular
                //var urllocation = $(location).attr('pathname');
                //if($.cookie(urllocation)!=="true"){
                    var valueoverall = $('input[name=widget_stars_value_rate]:checked').val();
                    if(typeof valueoverall !== "undefined") {
                        var titlecomment = $('#widget_title_comment').val();
                        var comment = $('#widget_comment').val();
                        var urllocation = $(location).attr('pathname');
                        var urlServer = urlserverGlobal+ "ControllerStar?comment="+comment+"&id="+urllocation+"&app="+app+"&user="+user+"&star="+valueoverall+"&titlecomment="+titlecomment+"&callback=?";
                        var preferences = "";
                        $.ajax({
                            url: urlServer,//url servicio rest
                            type: 'get',//tipo de petición
                            data: preferences,//datos a enviar en formato JSON
                            dataType: 'jsonp',//tipo de datos
                            jsonp: 'callback',//nombre de la variable get para reconocer la petición
                            success: function(res) {
                                processResponse(res);
                                loadmessage();
                             }
                             , 
                             error: function(e , msg){ 
                                 processError(e,msg);
                             }
                        });
                    }else{
                        alert("You must select a rating from 1 to 5 stars");
                    }
                    
                //}else{
                //    alert("---ya has introducido tu valorcion----");
                //    loadValue();
                //}
            }
            
            function loadValue(){
                var urllocation = $(location).attr('pathname');
                var urlServer = urlserverGlobal+ "ControllerGetStar?id="+urllocation+"&app="+app+"&user="+user+"&callback=?";
                var preferences = "";
                $.ajax({
                    url: urlServer,//url servicio rest
                    type: 'get',//tipo de petición
                    data: preferences,//datos a enviar en formato JSON
                    dataType: 'jsonp',//tipo de datos
                    jsonp: 'callback',//nombre de la variable get para reconocer la petición
                    success: function(res) {
                        completeComments(res);
                    }, 
                    error: function(e , msg){ 
                         processError(e,msg);
                     }
                });
                
            }
            
            var numc = 0;
            function completeStar(res){
                    $("[name=widget_stars_value]").val([res.value]);
                    $("#widget_comments").empty();
                    //rellenar listado de comentarios
                    jQuery.each(res.comments, function() {
                        numc = numc +1;
                        $("#widget_comments").prepend("<div id='widget_comment_text"+numc+"' class='widget_comment_text' onclick='zoomcomment("+numc+");'>" + this.c +"</div><hr>");
                    });
            }
            
            function completeComments(res){
                    $("#widget_media_rating").text("the average rating of all users is: " + res.value);
                    $("[name=widget_stars_value]").val([res.value]);
                    $("#widget_comments_ul").empty();
                    //rellenar listado de comentarios
                    jQuery.each(res.comments, function() {
                        numc = numc +1;
                        $("#widget_comments_ul").prepend("<li class='widget_comments_li'><span class='visuallyhidden'><h2>"+this.title+"</h2></span><span class='visuallyhidden'>The rating of this user is "+this.value+"</span><img src='"+imageuser+"' alt='"+altimguser+"'/><p style='margin:0px;'><span class='widget_comments_h5'>"+this.date+"</span></p><span aria-hidden='true'><h2 class='widget_comments_h3'>"+this.title+"</h2></span><span aria-hidden='true'><p class='widget_categorization' align='left' style='margin:0px;'><input id='radio_stars1_comment_"+numc+"' type='radio' name='widget_stars_value_comment_"+numc+"' class='widget_stars_value' value='5' disabled><label for='radio_stars1_comment_"+numc+"' class='widget_label_30'><span class='visuallyhidden'>5 Stars</span>&#9733;</label><input id='radio_stars2_comment_"+numc+"' type='radio' name='widget_stars_value_comment_"+numc+"' class='widget_stars_value' value='4' disabled><label for='radio_stars2_comment_"+numc+"' class='widget_label_30'><span class='visuallyhidden'>4 Stars</span>&#9733;</label><input id='radio_stars3_comment_"+numc+"' type='radio' name='widget_stars_value_comment_"+numc+"' class='widget_stars_value' value='3' disabled><label for='radio_stars3_comment_"+numc+"' class='widget_label_30'><span class='visuallyhidden'>3 Stars</span>&#9733;</label><input id='radio_stars4_comment_"+numc+"' type='radio' name='widget_stars_value_comment_"+numc+"' class='widget_stars_value' value='2' disabled><label for='radio_stars4_comment_"+numc+"' class='widget_label_30'><span class='visuallyhidden'>2 Stars</span>&#9733;</label><input id='radio_stars5_comment_"+numc+"' type='radio' name='widget_stars_value_comment_"+numc+"' class='widget_stars_value' value='1' disabled><label for='radio_stars5_comment_"+numc+"' class='widget_label_30'><span class='visuallyhidden'>1 Stars</span>&#9733;</label></p></span><div class='widget_article'><div class='widget_text short'></div><div class='widget_text full'>"+this.c+"</div><span class='widget_read-more' id='widget_read-more"+numc+"'>readmore</span></div></li>");
                        $("[name=widget_stars_value_comment_"+numc+"]").val([this.value]);
                    });
                    
                    //$("[name=widget_stars_value_comment_1]").val([4]);
                    loadlistcommentsDefault();
            }
            
            
            var numzoomcomment = 0;
            function zoomcomment(num){
                $(".widget_comment_text").attr("style", "background-color: transparent !important");
                if(numzoomcomment===num){
                    $("#widget_zoom_comment").hide();
                    numzoomcomment = 0;
                }else{
                    //poner fondo normal a todos los DIV
                    $("#widget_comment_text"+num).attr("style", "background-color: #f9f8f8 !important");
                    $("#widget_zoom_comment").show();
                    numzoomcomment = num;
                }
            }
            
            function loadlistcomments(){
                loadValue();
                if($("#widget_zoom_comment").is(":visible")){
                    $("#widget_zoom_comment").hide();
                }else{
                    $(".widget_zoom_comment").hide();
                    $("#widget_zoom_comment").show();
                }
            }
            
            
            function loadmessage(){
                loadyourrate();
                $("#widget_message_confirmation").show();
                setTimeout(hideMessage, 2000);
            }
            
            function hideMessage(){
                $("#widget_message_confirmation").hide();
            }
            
            function loadyourrate(){
                if($("#widget_your_rate").is(":visible")){
                    $("#widget_your_rate").hide();
                    //poner vacio todo
                    $("#widget_title_comment").val("");
                    $("#widget_comment").val("");
                }else{
                    $(".widget_zoom_comment").hide();
                    $("#widget_your_rate").show();
                }
            }
            
            
            $(".readonly:radio").on("click", function(){
                return false;
            });
            
            
            function loadlistcommentsDefault(){    
                var maxChars = 520;
                var ellipsis = "...";
                $(".widget_article").each(function() {
                    var text = $(this).find(".widget_text.full").text();
                    var html = $(this).find(".widget_text.full").html();        
                    if(text.length > maxChars)
                    {            
                        var shortHtml = html.substring(0, maxChars - 3) + "<span class='widget_ellipsis'>" + ellipsis + "</span>";
                        $(this).find(".widget_text.short").html(shortHtml);            
                    }else{
                        var shortHtml = $(this).find(".widget_text.full").text();
                        $(this).find(".widget_text.short").html(shortHtml);
                        $(this).find(".widget_read-more").hide();
                    }
                });
                $(".widget_read-more").click(function(){        
                    var readMoreText = "readmore";
                    var readLessText = "readless";        
                    var $shortElem = $(this).parent().find(".widget_text.short");
                    var $fullElem = $(this).parent().find(".widget_text.full");        

                    if($shortElem.is(":visible"))
                    {           
                        $shortElem.hide();
                        $fullElem.show();
                        $(this).text(readLessText);
                    }
                    else
                    {
                        $shortElem.show();
                        $fullElem.hide();
                        $(this).text(readMoreText);
                    }       
                });
            };
            
            
            function createWidget(){
                
                if(user===''){
                    $("#widget_feedback").append("<div class='widget_message' id='widget_message_confirmation' style='display:none;'><div id='widget_title_message_confirmation' class='widget_title'>Message</div><h3 id='widget_message_confirmation_h3' style='text-align: center;'>Your evaluation has been registered</h3></div><div class='widget_zoom_comment' id='widget_zoom_comment' style='display:none;'><a href='#' onclick='$(\"#widget_zoom_comment\").hide();' class='widget_linktitle'><span class='visuallyhidden'>Hide </span><div  id='widget_title_list_comment' class='widget_title'>List of Comments &#9658; </div></a><span class='visuallyhidden'><h1>List of Comments</h1></span><ul id='widget_comments_ul' class='widget_comments_ul'></ul></div><!-- Menu PRINCIPAL--><div class='widget_stars' id='widget_stars'><a href='#' onclick='$(\"#widget_your_rate\").hide();$(\"#widget_zoom_comment\").hide();$(\"#widget_content\").slideToggle(\"slow\");' class='widget_linktitle'><div  id='widget_title' class='widget_title'>Feedback &#9650; &#9660;</div></a><div id='widget_content' class='widget_content'><span class='visuallyhidden' id='widget_media_rating'></span><span aria-hidden='true'><p class='widget_categorization' align='center'><input id='radio_stars1' type='radio' name='widget_stars_value' value='5'><label for='radio_stars1' class='widget_label widget_mouse_pointer'><span class='visuallyhidden'>5 Stars</span>&#9733;</label><input id='radio_stars2' type='radio' name='widget_stars_value' value='4'><label for='radio_stars2' class='widget_label widget_mouse_pointer'><span class='visuallyhidden'>4 Stars</span>&#9733;</label><input id='radio_stars3' type='radio' name='widget_stars_value' value='3'><label for='radio_stars3' class='widget_label widget_mouse_pointer'><span class='visuallyhidden'>3 Stars</span>&#9733;</label><input id='radio_stars4' type='radio' name='widget_stars_value' value='2'><label for='radio_stars4' class='widget_label widget_mouse_pointer'><span class='visuallyhidden'>2 Stars</span>&#9733;</label><input id='radio_stars5' type='radio' name='widget_stars_value' value='1'><label for='radio_stars5' class='widget_label widget_mouse_pointer'><span class='visuallyhidden'>1 Stars</span>&#9733;</label></p></span><div id='widget_options' class='widget_options'><ul class='widget_options_ul'><li class='widget_options_li'><a href='#' class='widget_btn' onclick='loadlistcomments();' role='button'>Comments</a></li><!--<li class='widget_options_li'><a href='#' class='widget_btn' onclick='' role='button'>Bug tracking</a></li><li class='widget_options_li'><a href='#' class='widget_btn' onclick='' role='button'>Ideation</a></li>--></ul></div></div></div><!-- FIN Menu PRINCIPALLL-->");
                }else{
                    $("#widget_feedback").append("<div class='widget_message' id='widget_message_confirmation' style='display:none;'><div id='widget_title_message_confirmation' class='widget_title'>Message</div><h3 id='widget_message_confirmation_h3' style='text-align: center;'>Your evaluation has been registered</h3></div><div class='widget_zoom_comment' id='widget_zoom_comment' style='display:none;'><a href='#' onclick='$(\"#widget_zoom_comment\").hide();' class='widget_linktitle'><span class='visuallyhidden'>Hide </span><div  id='widget_title_list_comment' class='widget_title'>List of Comments &#9658; </div></a><span class='visuallyhidden'><h1>List of Comments</h1></span><ul id='widget_comments_ul' class='widget_comments_ul'></ul></div><div class='widget_zoom_comment' id='widget_your_rate' style='display:none;'><a href='#' onclick='$(\"#widget_your_rate\").hide();' class='widget_linktitle'><div class='widget_title'><span class='visuallyhidden'>Hide </span><h1 class='widget_title_h1'>Your Rate &#9658;</h1></div></a><div style='padding: 10px;'><h1 class='h1styletitle'>Your overall rating of this product</h1><p class='widget_categorization' align='center'><input id='radio_stars1_rate' type='radio' name='widget_stars_value_rate' value='5'><label for='radio_stars1_rate' class='widget_label_50 widget_mouse_pointer'><span class='visuallyhidden'>5 Stars</span>&#9733;</label><input id='radio_stars2_rate' type='radio' name='widget_stars_value_rate' value='4'><label for='radio_stars2_rate' class='widget_label_50 widget_mouse_pointer'><span class='visuallyhidden'>4 Stars</span>&#9733;</label><input id='radio_stars3_rate' type='radio' name='widget_stars_value_rate' value='3'><label for='radio_stars3_rate' class='widget_label_50 widget_mouse_pointer'><span class='visuallyhidden'>3 Stars</span>&#9733;</label><input id='radio_stars4_rate' type='radio' name='widget_stars_value_rate' value='2'><label for='radio_stars4_rate' class='widget_label_50 widget_mouse_pointer'><span class='visuallyhidden'>2 Stars</span>&#9733;</label><input id='radio_stars5_rate' type='radio' name='widget_stars_value_rate' value='1'><label for='radio_stars5_rate' class='widget_label_50 widget_mouse_pointer'><span class='visuallyhidden'>1 Stars</span>&#9733;</label></p><label for='widget_title_comment' class='h1styletitle'>Title of your review</label><input type='text' name='widget_title_comment' id='widget_title_comment' style='width: 450px;margin-bottom:15px;'/><label for='widget_comment' class='h1styletitle'>Your review</label><textarea rows='9' cols='62' name='widget_comment' id='widget_comment'></textarea><br><br><a class='widget_btn_round' href='#' onclick='callWebServiceWithComment();' role='button'>Send Your Rate</a></div></div><!-- Menu PRINCIPAL--><div class='widget_stars' id='widget_stars'><a href='#' onclick='$(\"#widget_your_rate\").hide();$(\"#widget_zoom_comment\").hide();$(\"#widget_content\").slideToggle(\"slow\");' class='widget_linktitle'><div  id='widget_title' class='widget_title'>Feedback &#9650; &#9660;</div></a><div id='widget_content' class='widget_content'><span class='visuallyhidden' id='widget_media_rating'></span><span aria-hidden='true'><p class='widget_categorization' align='center'><input id='radio_stars1' type='radio' name='widget_stars_value' value='5'><label for='radio_stars1' class='widget_label widget_mouse_pointer'><span class='visuallyhidden'>5 Stars</span>&#9733;</label><input id='radio_stars2' type='radio' name='widget_stars_value' value='4'><label for='radio_stars2' class='widget_label widget_mouse_pointer'><span class='visuallyhidden'>4 Stars</span>&#9733;</label><input id='radio_stars3' type='radio' name='widget_stars_value' value='3'><label for='radio_stars3' class='widget_label widget_mouse_pointer'><span class='visuallyhidden'>3 Stars</span>&#9733;</label><input id='radio_stars4' type='radio' name='widget_stars_value' value='2'><label for='radio_stars4' class='widget_label widget_mouse_pointer'><span class='visuallyhidden'>2 Stars</span>&#9733;</label><input id='radio_stars5' type='radio' name='widget_stars_value' value='1'><label for='radio_stars5' class='widget_label widget_mouse_pointer'><span class='visuallyhidden'>1 Stars</span>&#9733;</label></p></span><div id='widget_options' class='widget_options'><ul class='widget_options_ul'><li class='widget_options_li'><a href='#' class='widget_btn' onclick='loadyourrate();' role='button'>Your Rate</a></li><li class='widget_options_li'><a href='#' class='widget_btn' onclick='loadlistcomments();' role='button'>Comments</a></li><!--<li class='widget_options_li'><a href='#' class='widget_btn' onclick='' role='button'>Bug tracking</a></li><li class='widget_options_li'><a href='#' class='widget_btn' onclick='' role='button'>Ideation</a></li>--></ul></div></div></div><!-- FIN Menu PRINCIPALLL-->");
                }
            }
            
            
             $(window).load(function() {
                   createWidget();
                   loadValue();
            });
            
