function message() {
	window.alert('Ein Pferd ist Möören!');
	$('p#toggletest').slidetoggle();
}

function einfliegen() {
	  if (document.getElementById("menüliste").style.display == "none")
	  {	
	  			$("#menüliste").show("slow", function() {
				document.getElementById("menüliste").style.display = 'block';
		});
	  } else {
				$("#menüliste").hide("slow", function() {
				document.getElementById("menüliste").style.display = 'none';
		});
	  }
}

