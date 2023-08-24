// globals
const svgCanvas = new $.SvgCanvas(document.getElementById("svgcanvas"));
const editor = new MD.Editor();
const state = new State();

editor.modal = {
  about: new MD.Modal({
    html: `
      <h1>关于本应用</h1>
      <p>Method Draw 是一个免费、 <a href="https://github.com/methodofaction/Method-Draw">开源</a> 的矢量绘图应用. </p>
      <p>汉化By (<a href="https://github.com/muzihuaner">木子欢儿</a>) .</p>
      `
  }),
  source: new MD.Modal({
    html: `
      <div id="svg_source_editor">
        <div id="svg_source_overlay" class="overlay"></div>
        <div id="svg_source_container">
          <form>
            <textarea id="svg_source_textarea" spellcheck="false"></textarea>
          </form>
          <div id="tool_source_back" class="toolbar_button">
            <button id="tool_source_cancel" class="cancel">取消</button>
            <button id="tool_source_save" class="ok">应用更改</button>
          </div>
        </div>
    </div>`,
    js: function(el){
      el.children[0].classList.add("modal-item-source");
      el.querySelector("#tool_source_save").addEventListener("click", function(){
        var saveChanges = function() {
          svgCanvas.clearSelection();
          $('#svg_source_textarea').blur();
          editor.zoom.multiply(1);
          editor.rulers.update();
          editor.paintBox.fill.prep();
          editor.paintBox.stroke.prep();
          editor.modal.source.close();
        }

        if (!svgCanvas.setSvgString($('#svg_source_textarea').val())) {
          $.confirm("SVG源代码中存在解析错误。\n还原SVG源代码?", function(ok) {
            if(!ok) return false;
            saveChanges();
          });
        } else {
          saveChanges();
        } 
      })
      el.querySelector("#tool_source_cancel").addEventListener("click", function(){
        editor.modal.source.close();
      });
    }
  }),
  configure: new MD.Modal({
    html: `
      <h1>配置</h1>
      <div id="configuration">
        <button class="warning">擦除所有数据</button>
        </div>
      </div>`,
    js: function(el){
      const input = el.querySelector("#configuration button.warning");
      input.addEventListener("click", function(){
        state.clean();
      })
    }
  }),
  donate: new MD.Modal({
    html: `
      <h1>捐赠</h1>
      <p>
        <a href="/">Donate now</a> 
      </p>`
  }),
  shortcuts: new MD.Modal({
    html: `
      <h1>快捷键</h1>
      <div id="shortcuts"></div>`,
    js: function(el){
      el.children[0].classList.add("modal-item-wide");
    }
  })
};