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
      transition: 'opacity .5s linear .9s'
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
  

  var loadManifest = function(manifest){

      var sum = 0;
      var totalHeight = parseInt(window.getComputedStyle(iconMask, null).getPropertyValue("height"));

      var load = function(){
        var height;
        var finished = false;
        sum++;
        if(sum === manifest.length){
            height = totalHeight;
            finished = true;
        }
        else{
            height = parseInt(sum / manifest.length * totalHeight);
        }
        iconMask.style.height = (totalHeight - height) + 'px';
        if(finished){
            mask.style.opacity = 0;
            mask.addEventListener('transitionend', function(e){
                if(e.target === mask){
                    mask.remove();
                }
            })
        }
      };
      for(var i = 0; i < manifest.length; i++){
          var script = document.createElement('script');

          script.onload = load;
          script.src = manifest[i];
          document.body.append(script);
      }
  }

  var iconDom = createImg(icon);
  iconDom.onload = function(){
      loadManifest(manifest);
  }

  imgWrap.append(iconDom);
  imgWrap.append(iconMask);

  mask.append(imgWrap);

  document.body.append(mask);
}