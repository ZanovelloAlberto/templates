
export function main() {
    // return `Hello ${who}! `;
    let canvas = document.createElement("canvas")
    
    document.title = "ciao"
    canvas.id = 'myCanvas';
    // document.append(document.createElement('body'))
    document.body.appendChild(canvas)
  
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
  
      if (ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(50, 50, 200, 100);
      } else {
        alert('2D context is not supported by your browser.');
      }
    } else {
      alert('Canvas is not supported by your browser.');
    }
  
  }