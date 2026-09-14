export function select(q, parent = document) { 
  return parent.querySelector(q); 
}

export function selectAll(q, parent = document) { 
  return parent.querySelectorAll(q); 
}

export function selectById(q, parent = document) { 
  return parent.getElementById(q); 
}

export function selectByClass(q, parent = document) { 
  return parent.getElementsByClassName(q);
}
