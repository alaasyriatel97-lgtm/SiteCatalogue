// src/app/theme/shared/shared.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// استيراد المكونات التي تريد مشاركتها (تأكد من وجود هذه الملفات في مشروعك أو قم بإنشائها)
// إذا كنت تستخدم Mantis Card الذي أنشأناه سابقاً:
// import { MantisCardComponent } from 'src/app/shared/components/mantis-card/mantis-card.component';
// أو إذا كان لديك CardComponent القديم:
// import { CardComponent } from './components/card/card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    // المكونات غير الـ Standalone توضع هنا
  ],
  exports: [
    // نعيد تصدير المكتبات ليتم استخدامها في أي مكان يستورد SharedModule
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // تصدير المكونات لتظهر في الصفحات الأخرى
    // MantisCardComponent
  ]
})
export class SharedModule { }
