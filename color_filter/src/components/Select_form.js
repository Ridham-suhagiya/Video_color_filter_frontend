import React from 'react';
import './components.css';
import  placeholder from "../assets/placeholder.gif";

const Select_form = () => {

	function get_file(e){
	    let url = URL.createObjectURL(e.target.files[0])
	    if (e.target.files[0].type.split('/')[0] == 'video'){
	    	document.getElementById('prev_file').setAttribute('src',url);
	    	document.getElementById('prev_file').style.display = 'block';
	    	document.getElementById('prev_image').style.display = 'none';
	    }
		else{   
		    document.getElementById('prev_image').setAttribute('src',url);			
		}
	}

	function get_input() {
		document.getElementById('file_input').click()
	}

	function call_api(e) {
		e.preventDefault();
  		let img = document.getElementById('file_input').files[0];
	    let reader = new FileReader()
  		reader.onload = function(e) {
  			console.log( typeof e.target.result)
	  		fetch('http://127.0.0.1:8000',
				{
					method:'POST',
					headers: {"Content-Type":"application/json" ,'accept': 'application/json'},
					body: JSON.stringify({"file": e.target.result})
				}
			)
			.then((resp) => resp.json())
			.then((data) => console.log(data))	
	  	}
  		reader.readAsDataURL(img);
	}

	return (
		<div className='form' >
			<div className="form-info-section">
				Upload your file here..
			</div>
			<div className='upload-section'>
				<form method='POST' id='file-form' encType='multipart/form-data'>
					<div className='preview-file' onClick={get_input}>
						<img className="prev_image" src={placeholder} alt=''  id='prev_image'/>
						<video className="prev_file"  alt=''  id='prev_file' autoPlay={true} muted={true}>
						</video>
					</div>
					<div className='input-section'>
						{/*<label>
							Add file here*/}
							<input type='file' name='file' className='file-input-box' onChange={get_file} id='file_input'/>
						{/*</label>*/}
					</div>
					<div className='button-cover'>
					    <button className='btn' id='button' onClick={call_api}>
					        Submit here
					    </button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Select_form