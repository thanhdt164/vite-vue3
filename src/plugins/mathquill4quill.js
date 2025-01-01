import Quill from 'quill';
import MathQuill from 'mathquill';
import { MathQuill4Quill } from 'mathquill4quill';

// Initialize MathQuill
const MQ = MathQuill.getInterface(2);

// Initialize MathQuill4Quill
const mathQuill4Quill = new MathQuill4Quill({ Quill, MathQuill: MQ });

export {mathQuill4Quill};