//https://awhitepixel.com/blog/wordpress-gutenberg-create-custom-block-part-2-register-block/ 
//https://awhitepixel.com/blog/wordpress-gutenberg-add-image-select-custom-block/
//prob his way of using withSelect as a wrapper for the whole rendered comp.
//is better than mine of using useSelect hook which is recalled on every attr. change. 


const { registerBlockType } = window.wp.blocks;

import {  MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, TextControl } from '@wordpress/components';
import { withSelect, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';




const ImageEditor = (props) => {
	
    console.log("ImageEditor props", props);
   
  

    const blockStyle = {
		backgroundImage: props.image != undefined  ? 'url("' + props.image.url + '")' : 'none'
	};

	return (
		<div className="zoom-slideshow-buttons-fe">

					<div className="editor-post-featured-image">
						
                        <MediaUploadCheck>
                          
                            <MediaUpload
                                onSelect={(media) => {props.changeOrAddMedia({idx: props.idx, media})}}
                                value={props.image?.id  || 0}
                                allowedTypes={ ['image'] }
                                render={({open}) => (
                                    <Button 
                                        className={props.image?.id == 0 ? 'editor-post-featured-image__toggle' 
                                        : 'editor-post-featured-image__preview'}
                                        onClick={open}
                                    >
                                        {props.image?.id == undefined && __('Choose an image (*16:9 ratio)', 'zoom-slideshow')}
                                        {props.image?.id != undefined && 
                                                    <img width="100" height="auto" src={props.image.url} />
                                        }
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                        {props.image != undefined && 
                            <MediaUploadCheck>
                                <Button onClick={() => {props.removeMedia(props.idx)}}  isDestructive>{__('Remove image', 'zoom-slideshow')}</Button>
                            </MediaUploadCheck>
		                }                    
					</div>
		
			<div style={blockStyle}>
				
			</div>
		</div>
	);
};

 
registerBlockType('screen4/zoom-slideshow', {
	title: 'Zoom Slideshow (Pacer)',
	category: 'common',
	icon: 'smiley',
	description: 'Zoom Slideshow',
	keywords: ['zoom', 'slideshow', 'pacer'],
    attributes: {
	    images : {type: 'array', default: []} /*   mediaId: media.id, mediaUrl: media.url */
   
    },

    

	edit: (props) => { 
        
        const { attributes, setAttributes } = props;
        console.log("edit called attributes", attributes);

        const removeMedia = (idx) => {
            let images = structuredClone(attributes.images); 
            let newImages = [];
            
            for (let i = 0; i < images.length; i++)
            {
                if (i != idx)
                {
                    newImages.push(images[i]);
                }
            }

            setAttributes({
                images: newImages
            });
        }

        const changeOrAddMedia = ({idx, media}) => {
            
            console.log("changeOrAddMedia xxxx", idx, media);
            let images = structuredClone(attributes.images); 

            if (idx != undefined && media != undefined && media.id != undefined ) //change
            {
                console.log("changing", media);
                images[idx].id = media.id;
                images[idx].url = media.url;
            }
            else
            {
                images.push(media);
            }

            setAttributes({
                images: images
            });
        }

   



        const media = useSelect( ( select ) => {
            
            if (attributes.mediaId != 0)
            {   
                const data = select( 'core' ).getMedia(attributes.images);
                console.log("data", data);
                return data;
            }
            else
            {
                return {id: undefined};
            }
            
        }, [attributes] );


        let imageList = attributes.images.map(function(image, idx)  { 
            console.log("in map", image);
            return <ImageEditor image={image} idx={idx} changeOrAddMedia={changeOrAddMedia} removeMedia={removeMedia} />
        });

        console.log("imageList", imageList);

		return <>

            {imageList}
 
            <div >
                Add New Slide:
               <ImageEditor changeOrAddMedia={changeOrAddMedia} />
            </div>



        </> 
	},
    
	save: (props) => { 
        {/* {`document.location.href=${attributes.menuLink}`} */}
		const { attributes } = props;
        console.log("attributes", attributes);
	    return  <div>
                hello
            </div>
            
	}
});


