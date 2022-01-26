window.preload = function(icon, manifest){
    
    if (!Object.entries)
        Object.entries = function( obj ){
            var ownProps = Object.keys( obj ),
                i = ownProps.length,
                resArray = new Array(i); // preallocate the Array
            while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
  
            return resArray;
        };
  
    var createDiv = function(style){
        var div = document.createElement("div");
        for(const [key, value] of Object.entries(style)){
            div.style[key] = value;
        }
        return div;
    }
  
    var createImg = function(src){
        var img = document.createElement('img');
        img.src = src;
        img.style.maxWidth = '150px';
        return img;
    }
  
    var mask = createDiv({
        width: '100%',
        height: '100%',
        position: 'fixed',
        backgroundColor: 'white',
        display: 'flex',
        top: 0,
        left: 0,
        opacity: '1',
        zIndex: 9999,
    });
  
    var imgWrap = createDiv({
        position: 'relative',
        margin: 'auto'
    });
  
    var iconMask = createDiv({
        position: 'absolute',
        top:'0',
        left:'0',
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        opacity: '0.9',
        transition: 'height .9s linear'
    });

    var sum = 0;
    var animation = function(){};
    var startAnimate = false;

    var timeoutId = setTimeout(function(){
        startAnimate = true;
        mask.style.transition = 'opacity .5s linear .9s';

        var iconDom = createImg(icon);

        imgWrap.append(iconDom);
        imgWrap.append(iconMask);

        mask.append(imgWrap);
        var totalHeight = parseInt(window.getComputedStyle(iconMask, null).getPropertyValue("height"));
        animation = function(){
            if(sum === manifest.length){
                height = totalHeight;
            }
            else{
                height = parseInt(sum / manifest.length * totalHeight);
            }
            iconMask.style.height = (totalHeight - height) + 'px';
            if(sum === manifest.length){
                mask.style.opacity = 0;
                mask.addEventListener('transitionend', function(e){
                    if(e.target === mask){
                        mask.remove();
                    }
                })
            }
        }
    }, 200);
    
  
    var loadManifest = function(manifest){
  
        var load = function(){
          var finished = false;
          
          sum++;
          if(sum === manifest.length){
              finished = true;
              clearTimeout(timeoutId);
              animation();
              if(!startAnimate){
                mask.remove();
              }
              
          }
          else{
            animation();
          }
        };
  
        for(var i = 0; i < manifest.length; i++){
            if(manifest[i].includes('.js')){
              addScript(manifest[i], load);
            }
            else if(manifest[i].includes('.css')){
              addStyle(manifest[i], load);
            }
        }
    }
  
    
  
    var addScript = function(js, load){
          var script = document.createElement('script');
  
          script.onload = load;
          script.src = js;
          document.body.append(script);
    }
  
    var addStyle = function(css, load){
      var link = document.createElement('link');
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.onload = load;
      link.href = css;
      document.head.append(link);
    }

    loadManifest(manifest);
  
    document.body.append(mask);
  }