/**
 * Created by Liu.Jun on 2019/11/29 11:25.
 */

import createVue2Core from '@lljj/vue2-form-core';

import WIDGET_MAP from './config/widgets/WIDGET_MAP.js';

// import i18n from '@lljj/vjsf-utils/i18n';
// import * as vueUtils from '@lljj/vjsf-utils/vueUtils';
// import * as formUtils from '@lljj/vjsf-utils/formUtils';
// import * as schemaValidate from '@lljj/vjsf-utils/schema/validate';
// import getDefaultFormState from '@lljj/vjsf-utils/schema/getDefaultFormState';

// import fieldProps from '@lljj/vue2-form-core/JsonSchemaForm/fields/props';
// import SchemaField from './JsonSchemaForm/fields/SchemaField';

const JsonSchemaForm = createVue2Core(Object.freeze({
    WIDGET_MAP: Object.freeze(WIDGET_MAP),
    COMPONENT_MAP: Object.freeze({
        form: {
            functional: true,
            render(h, context) {
                const labelWidth = (context.data.props.labelPosition === 'top' || !context.data.props.labelWidth || !context.data.props)
                    ? undefined
                    : parseFloat(String(context.data.props.labelWidth));

                context.data.props = {
                    ...context.data.props,
                    labelWidth
                };

                return h('i-form', context.data, context.children);
            }
        },
        formItem: {
            functional: true,
            render(h, context) {
                context.data.props = {
                    ...context.data.props,
                    labelWidth: (context.data.props && context.data.props.labelWidth)
                        ? parseFloat(String(context.data.props.labelWidth))
                        : undefined
                };

                // https://github.com/vuejs/vue/issues/8380
                // 具名插槽需要重新显示的指定，无法直接透传 Orz...
                return h('form-item', context.data, Object.entries(context.slots()).map(([slotName, VNode]) => h('template', {
                    slot: slotName
                }, VNode)));
            }
        },
        button: 'i-button',
        popover: {
            functional: true,
            render(h, context) {
                const { default: content, reference: defaults } = context.slots();

                return h('poptip', context.data, [
                    h('template', {
                        slot: 'default'
                    }, defaults),
                    h('template', {
                        slot: 'content'
                    }, content),
                ]);
            }
        },
    }),
    ICONS_MAP: Object.freeze({
        question: 'el-icon-question',
        moveUp: 'el-icon-caret-top',
        moveDown: 'el-icon-caret-bottom',
        close: 'el-icon-close',
        plus: 'el-icon-plus'
    })
}));

export default JsonSchemaForm;

// 存在Vue 全局变量默认注册 VueForm 组件
// if (typeof window !== 'undefined' && window.Vue) {
//     window.Vue.component('VueForm', JsonSchemaForm);
// }

// export {
//     SchemaField,
//     fieldProps,
//
//     getDefaultFormState,
//     vueUtils,
//     formUtils,
//     schemaValidate,
//     i18n
// };
