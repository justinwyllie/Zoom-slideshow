import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

registerBlockType( 'screen4/zoom-slideshow', {
    title: 'Zoom Slideshow (Pacer)',
	category: 'common',
	icon: 'smiley',
	description: 'Zoom Slideshow',
	keywords: ['zoom', 'slideshow', 'pacer'],

    edit: () => {
        const blockProps = useBlockProps();

        return (
            <div { ...blockProps }>
                
                <InnerBlocks allowedBlocks={['core/image']} />
                <p><button>Click to add images</button> (Images should be jpegs 16:9 with the longest edge approximately 2000px).</p>
            </div>
        );
    },

    save: () => {
        const blockProps = useBlockProps.save();

        return (
            <div class="fp-slideshow" { ...blockProps }>
                <InnerBlocks.Content />
            </div>
        );
    },
} );