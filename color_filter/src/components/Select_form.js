import React from 'react';
import './components.css';
import  placeholder from "../assets/placeholder.gif";
import { useState, useEffect, useRef } from 'react';
const SelectForm = (file_byte_setter) => {
	const [new_bytes , new_byte_setter] = useState(null);	
	const [file_url, file_url_setter] = useState(null);

 	function get_file(e){
	    let url = URL.createObjectURL(e.target.files[0]);
	    file_url_setter(url);
	    if (e.target.files[0].type.split('/')[0] === 'video'){
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

	function check_filled_info(argument) {
		let inputs = document.getElementsByTagName('input');
		border('color-section-div')
		border('image_prev_div')
		let flag = true;
		if (inputs[0].value === ''){
			border('color-section-div', 'dashed', 'red', 'block')
			flag = false;	
		}
		if (inputs[1].value === ''){
			border('image_prev_div', 'dashed', 'red', 'block')	
			flag = false;
		}
		return flag;
	}

	function border(id, border_style='unset', border_color='unset', text = 'none') {
		document.getElementById(id).style.borderStyle = border_style;
		document.getElementById(id).style.borderColor = border_color;
		document.getElementById(id).getElementsByClassName('hidden_text')[0].style.display = text;
	}

	function call_api(e) {
		e.preventDefault();
		let resp = check_filled_info();
		if (resp){
			let color = document.getElementById('selected_color').value;
	  		let img = document.getElementById('file_input').files[0];
		    let reader = new FileReader()
	  		reader.onload = function(e) {
		  		fetch('http://127.0.0.1:8000',
					{
						method:'POST',
						headers: {"Content-Type":"application/json" ,'accept': 'application/json', "Access-Control-Allow-Origin":1},
						body: JSON.stringify({"file": e.target.result , 'color': color})
					}
				)
				.then((resp) => resp.json())
				.then((data) =>{
						new_byte_setter(data);	
				})
		  	}
	  		reader.readAsDataURL(img);
  		}
	}
	const download_link = useRef('')
	useEffect(() => {
		
		if (new_bytes  != null){
			// document.getElementById('prev_file').src = 'http://127.0.0.1:8000/static/output.mp4';
			let strHtml = `<img className="prev_image"  alt=''  />`;
			if (new_bytes.file === 'video'){
				 strHtml = `<video className="prev_file"  alt=''  autoPlay={true} muted={true}></video>`;
			}
			let result_image = document.getElementsByClassName('result_file')[0];
			console.log(new_bytes)
			result_image.insertAdjacentHTML('beforeend', strHtml);
			result_image.insertAdjacentHTML('beforeend', strHtml);
			download_link.current = 'http://127.0.0.1:8000/static/output.mp4';
			if (new_bytes.file === 'video'){
				result_image.getElementsByTagName('video')[0].src = file_url;
				result_image.getElementsByTagName('video')[1].src = 'http://127.0.0.1:8000/static/output.mp4';
			}
			else{
				download_link.current = `http://127.0.0.1:8000/static/output.${new_bytes.file_type}`;
				result_image.getElementsByTagName('img')[0].src = file_url;
				result_image.getElementsByTagName('img')[1].src = `http://127.0.0.1:8000/static/output.${new_bytes.file_type}`;
			}
			document.getElementById('download_link').href = download_link.current;
			document.getElementById('download_link').download = 1;
		}	
	}, [new_bytes, file_url])

	function select_option(e){
		let selected_color = e.target.value;
		document.getElementById('selected_color').value = selected_color;
	}
	function back() {
		return window.origin;
	}
	
	return (
		<div className='form'>
			<div id='form_content'>
			{ (new_bytes === null)? (<div>
										<div className="form-info-section">
											Upload your file here..
										</div>
										<div className='upload-section'>
											<form method='POST' id='file-form' encType='multipart/form-data'>
												<input id = 'selected_color'  style={{display:'none'}} />
												<div className='preview-file' onClick={get_input} >
													<div id='image_prev_div'>
														<img className="prev_image" src={placeholder} alt=''  id='prev_image'/>
														<video className="prev_file"  alt=''  id='prev_file' autoPlay={true} muted={true}></video>
														<p className='hidden_text'>select a file to continue</p>
													</div>
												</div>
												<div className='input-section'>
													<input type='file' name='file' className='file-input-box' onChange={get_file} id='file_input'/>
												</div>
												<div className='filter-option' id='color-section-div'>
													<h4>Choose filter color</h4>
														<div className='color-section'>
															<label>
																<input type='radio' value='red' name='same' onClick={select_option} />
																<span>Red</span>
															</label>
															<label>
																<input type='radio' value='green' name='same' onClick={select_option}/>
																<span>green</span>
															</label>
															<label>
																<input type='radio' value='blue' name='same' onClick={select_option} />				
																<span>blue</span>
															</label>
														</div>
														<p className='hidden_text'>select a color to continue</p>
												</div> 
												<div className='button-cover'>
												    <button className='btn' id='button' onClick={call_api}>
												        Submit here
												    </button>
												</div>
											</form>
										</div>
									</div>)
			: (<div>
				<div className='result_file'>
				</div>
				<div style={{display:'flex', 'justifyContent':'space-between'}}>
					<a href= {back()}  className='get_to_home'>Make more</a>
				    <a className='btn' id='download_link' href = {download_link.current}>
						Download
				    </a>
				</div>
			   </div>
				)}
			</div>
			
		</div>
	
	)
}

export default SelectForm;