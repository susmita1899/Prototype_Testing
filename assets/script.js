(function(){
  // Map pages to index for progress bar
  const order = [
    'index.html',
    '2-task.html',
    '3-prototype.html',
    '4-nasatlx.html',
    '5-sus.html',
    '6-ueq.html'
  ];
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const idx = Math.max(0, order.indexOf(path));
  const pct = Math.round(((idx+1)/order.length)*100);
  document.documentElement.style.setProperty('--w', pct + '%');

  // Attach nav
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');

  if(prev){
    prev.disabled = idx===0;
    prev.addEventListener('click', ()=> {
      if(idx>0){ window.location.href = order[idx-1]; }
    });
  }
  if(next){
    next.disabled = idx===order.length-1;
    next.addEventListener('click', ()=> {
      if(idx<order.length-1){ window.location.href = order[idx+1]; }
    });
  }

  // Optional: confirm before navigating away if user checks the confirm box
  const confirmBox = document.getElementById('confirmProceed');
  if(confirmBox){
    const nlabel = document.getElementById('nextLabel');
    const update = ()=> {
      if(confirmBox.checked){
        next.disabled = false;
        if(nlabel) nlabel.textContent = 'Next';
      }else{
        next.disabled = true;
        if(nlabel) nlabel.textContent = 'Submit form above, then tick the box to enable Next';
      }
    };
    confirmBox.addEventListener('change', update);
    update();
  }
})();