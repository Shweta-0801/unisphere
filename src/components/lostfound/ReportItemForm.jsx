import React from "react"; 
 
function ReportItemForm({ 
  formType, 
  setFormType, 
 
  formItemName, 
  setFormItemName, 
 
  formDescription, 
  setFormDescription, 
 
  formLocation, 
  setFormLocation, 
 
  formMarkerNote, 
  setFormMarkerNote, 
 
  formPhoto, 
  setFormPhoto, 
 
  formError, 
  setFormError, 
 
  handlePhotoUpload, 
  handleCreateReport, 
}) { 
  return ( 
    <div className="lostfound-section lostfound-report-section"> 
 
      <div className="lostfound-card report-form-card"> 
 
        <div className="form-heading-group"> 
 
          <h3 className="section-title"> 
            Report an Item 
          </h3> 
 
          <p className="section-subtitle"> 
            Publish a lost or found report to help 
            the campus community. Reports appear 
            on the campus map for 3 hours. 
          </p> 
 
        </div> 
 
        {formError && ( 
 
          <div className="form-error-alert"> 
            <span> 
              {formError} 
            </span> 
          </div> 
 
        )} 
 
        <form 
          onSubmit={handleCreateReport} 
          className="lostfound-form" 
        > 
 
          <div className="form-group"> 
 
            <label className="form-label"> 
              Select Report Type 
            </label> 
 
            <div className="type-toggle-selector"> 
 
              <button 
                type="button" 
                className={`type-toggle-btn btn-lost ${ 
                  formType === "lost" 
                    ? "active" 
                    : "" 
                }`} 
                onClick={() => 
                  setFormType("lost") 
                } 
              > 
 
                <span className="type-radio-dot"></span> 
 
                Lost Item 
                (I lost something) 
 
              </button> 
 
              <button 
                type="button" 
                className={`type-toggle-btn btn-found ${ 
                  formType === "found" 
                    ? "active" 
                    : "" 
                }`} 
                onClick={() => 
                  setFormType("found") 
                } 
              > 
 
                <span className="type-radio-dot"></span> 
 
                Found Item 
                (I found something) 
 
              </button> 
 
            </div> 
 
          </div> 
 
          <div className="form-group"> 
 
            <label 
              className="form-label" 
              htmlFor="itemName" 
            > 
              Item Name{" "} 
              <span className="field-required"> 
                * 
              </span> 
            </label> 
 
            <input 
              id="itemName" 
              type="text" 
              className="form-input" 
              placeholder="e.g. Black Leather Wallet, Casio Calculator, Blue Bottle" 
              value={formItemName} 
              onChange={(e) => 
                setFormItemName( 
                  e.target.value 
                ) 
              } 
            /> 
 
          </div> 
 
          <div className="form-group"> 
 
            <label 
              className="form-label" 
              htmlFor="itemLocation" 
            > 
              Campus Location{" "} 
              <span className="field-required"> 
                * 
              </span> 
            </label> 
 
            <select 
              id="itemLocation" 
              className="form-select" 
              value={formLocation} 
              onChange={(e) => 
                setFormLocation( 
                  e.target.value 
                ) 
              } 
            > 
 
              <option value="Library"> 
                Library 
              </option> 
 
              <option value="Turing Block"> 
                Turing Block 
              </option> 
 
              <option value="Academic Block"> 
                Academic Block 
              </option> 
 
              <option value="Cafeteria"> 
                Cafeteria 
              </option> 
 
              <option value="Hostel"> 
                Hostel 
              </option> 
 
              <option value="Main Gate"> 
                Main Gate 
              </option> 
 
              <option value="Sports Ground"> 
                Sports Ground 
              </option> 
 
            </select> 
 
          </div> 
 
          <div className="form-group"> 
 
            <label 
              className="form-label" 
              htmlFor="itemDesc" 
            > 
              Detailed Description{" "} 
              <span className="field-required"> 
                * 
              </span> 
            </label> 
 
            <textarea 
              id="itemDesc" 
              rows="3" 
              className="form-textarea" 
              placeholder="Provide specific details such as colour, brand, distinguishing marks, or room number..." 
              value={formDescription} 
              onChange={(e) => 
                setFormDescription( 
                  e.target.value 
                ) 
              } 
            /> 
 
          </div> 
 
          <div className="form-group"> 
 
            <label 
              className="form-label" 
              htmlFor="itemNote" 
            > 
              Landmark / Handover Note (Optional) 
            </label> 
 
            <input 
              id="itemNote" 
              type="text" 
              className="form-input" 
              placeholder="e.g. Handed to security guard at reception" 
              value={formMarkerNote} 
              onChange={(e) => 
                setFormMarkerNote( 
                  e.target.value 
                ) 
              } 
            /> 
 
          </div> 
 
          <div className="form-group"> 
 
            <label className="form-label"> 
              Upload Photo (Optional) 
            </label> 
 
            <input 
              type="file" 
              accept="image/*" 
              className="form-file-input" 
              onChange={ 
                handlePhotoUpload 
              } 
            /> 
 
            {formPhoto ? ( 
 
              <div className="uploaded-preview-container"> 
 
                <img 
                  src={formPhoto} 
                  alt="Upload preview" 
                  className="uploaded-preview-img" 
                /> 
 
                <button 
                  type="button" 
                  className="remove-photo-btn" 
                  onClick={() => 
                    setFormPhoto(null) 
                  } 
                > 
                  Remove Photo 
                </button> 
 
              </div> 
 
            ) : ( 
 
              <div className="no-photo-hint"> 
 
                <span> 
                  If no photo is uploaded, 
                  a clean &apos;No photo 
                  provided&apos; placeholder 
                  will be used. 
                </span> 
 
              </div> 
 
            )} 
 
          </div> 
 
          <div className="form-actions-row"> 
 
            <button 
              type="submit" 
              className="unisphere-btn unisphere-btn-primary" 
            > 
              Submit Report 
            </button> 
 
            <button 
              type="button" 
              className="unisphere-btn unisphere-btn-outline" 
              onClick={() => { 
 
                setFormItemName(""); 
                setFormDescription(""); 
                setFormMarkerNote(""); 
                setFormPhoto(null); 
                setFormError(""); 
 
              }} 
            > 
              Clear Fields 
            </button> 
 
          </div> 
 
        </form> 
 
      </div> 
 
    </div> 
  ); 
} 
 
export default ReportItemForm;
