const MyButtonGroupPart = {
	template: `<div class="buttonGroup-part"
		@click.ctrl.exact="onClick('middle')"
		@click.left.exact="onClick('left')"
		@click.shift.exact="onClick('shift')"
		@click.prevent.middle="onClick('middle')"
		@click.prevent.right="onClick('right')"
		@keyup.enter.space="onClick('left')"
		:class="{ cancel:isCancel, clickable:!isReadonly, justImage:!isFirst && image !== '' && caption === '' }"
		:tabindex="isFirst && !isReadonly ? 0 : -1"
		:title="captionTitle !== '' ? captionTitle : caption"
	>
		<img v-if="image !== ''" :src="'images/' + image" class="buttonGroup-part-img" />
		<div v-if="caption !== ''">{{ caption }}</div>
	</div>`,
	props:{
		caption:      { type:String,   default:'' },
		captionTitle: { type:String,   default:'' },
		isCancel:     { type:Boolean,  default:false },
		isFirst:      { type:Boolean,  default:false },
		isReadonly:   { type:Boolean,  default:false },
		image:        { type:String,   default:'' },
		onClickLeft:  { type:Function },
		onClickMiddle:{ type:Function },
		onClickRight: { type:Function },
		onClickShift: { type:Function }
	},
	methods:{
		onClick(mode) {
			if (this.isReadonly) return;

			switch(mode) {
				case 'left':   this.onClickLeft?.();   break;
				case 'middle': this.onClickMiddle?.(); break;
				case 'right':  this.onClickRight?.();  break;
				case 'shift':  this.onClickShift?.();  break;
			}
		}
	}
};

export default {
	components:{ MyButtonGroupPart },
	template: `<div
		class="buttonGroup"
		:class="{ anyClickable, cancel: allCancel }"
		:style="customStyle !== '' ? customStyle : ''"
	>
		<my-button-group-part
			v-for="(g,i) in group"
			:key="i"
			:caption="g.caption"
			:captionTitle="g.captionTitle"
			:image="g.image"
			:isCancel="g.isCancel"
			:isFirst="i === 0"
			:isReadonly="g.isReadonly"
			:onClickLeft="g.onClickLeft"
			:onClickMiddle="g.onClickMiddle"
			:onClickRight="g.onClickRight"
			:onClickShift="g.onClickShift"
		/>
	</div>`,
	props:{
		group: { type:Array, required:true },
		customStyle: {
			type: [String, Object, Array], // Compatible con la sintaxis de Vue
			default: ''
		}
	},
	emits:[],
	computed:{
		allCancel() {
			return this.group.filter(v => v.isCancel === undefined || v.isCancel).length === this.group.length;
		},
		anyClickable() {
			return this.group.filter(v => v.isReadonly === undefined || !v.isReadonly).length > 0;
		}
	}
};
