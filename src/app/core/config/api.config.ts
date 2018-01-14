import { Injectable } from '@angular/core';


/**
 *
 */
export interface IApiEndpoint {
  name: string;
  method?: string;
  url: string;
  restfull?: boolean;
}

/**
 *
 */
export enum ApiEndpointType {
  GET, PUT, POST, DELETE
}

/**
 *
 */
@Injectable()
export class EndpointService {

  private readonly baseUrl = 'http://10.10.20.201:8000'; // 'http://50.116.31.221';

  private endpoints: Array<IApiEndpoint> = [];

  constructor() {
    this.init();
  }

  /**
   * his.baseUrl
   * @param name
   */
  get(name: string): IApiEndpoint {

    const requiredEndpoint = this.endpoints.find(endpoint => endpoint.name === name);

    if (requiredEndpoint && requiredEndpoint.url.indexOf(this.baseUrl) !== 0) {// check if endpoint url has the baseUrl already.
      requiredEndpoint.url = this.baseUrl + requiredEndpoint.url;
    }

    return requiredEndpoint;
  }

  private init() {

    this.endpoints = [
      { name: 'LOGIN', url: '/v1/auth/login', method: 'POST' },
      { name: 'LOGOUT', url: '/v1/auth/logout', method: 'POST' },
      { name: 'GET_ALLUSERS', url: '/v1/users', method: 'GET' },
      { name: 'GET_LOGGEDINUSER', url: '/v1/users/me', method: 'GET' },
      { name: 'GET_USER', url: '/v1/users/USERID', method: 'GET' },
      { name: 'ADD_USER', url: '/v1/users', method: 'POST' },
      { name: 'DELETE_USER', url: '/v1/users/USERID', method: 'DELETE' },
      { name: 'UPDATE_USER', url: '/v1/users/USERID', method: 'PUT' },

      /*Students*/

      { name: 'GET_ALL_STUDENTS', url: '/api/v1/students', method: 'GET' },
      { name: 'GET_STUDENT', url: '/api/v1/students/STUDENTID', method: 'GET' },
      { name: 'ARCHIVE_STUDENT', url: '/api/v1/students/STUDENTID', method: 'DELETE' },

      { name: 'CREATE_STUDENT', url: '/api/v1/students', method: 'POST' },
      { name: 'UPDATE_STUDENT_GUARDIAN', url: '/api/v1/students/STUDENT_ID/guardian', method: 'POST' },
      { name: 'UPDATE_STUDENT_QUALIFICATION', url: '/api/v1/students/STUDENT_ID/qualification', method: 'POST' },
      { name: 'UPDATE_STUDENT', url: '/api/v1/students/STUDENT_ID', method: 'PUT' },
      /*StudentsAssingments*/

      { name: 'STUDENTS_ASSIGNMENT', url: '/api/v1/student/assignments', method: 'GET' },
      { name: 'UPLOAD_ASSIGNMENT', url: '/api/v1/resources/assignments', method: 'POST' },
      /*Document*/
      { name: 'UPLOAD_DOCUMENT', url: '/api/v1/resources', method: 'POST' },
      { name: 'SAVE_DOCUMENT', url: '/api/v1/students/STUDENT_ID/documents/DOCUMENT_ID', method: 'POST' },
      { name: 'LOAD_ALL_DOCUMENTS', url: '/api/v1/students/STUDENT_ID/documents', method: 'GET' },
      { name: 'VIEW_DOCUMENT', url: '/api/v1/resources/RESOURCE_ID', method: 'GET' },
      { name: 'DELETE_DOCUMENT', url: '/api/v1/resources/RESOURCE_ID', method: 'DELETE' },

      /*Lectures*/

      { name: 'GET_ALL_LECTURES', url: '/api/v1/lectures', method: 'GET' },
      { name: 'CREATE_LECTURE', url: '/api/v1/lectures', method: 'POST' },
      { name: 'UPDATE_LECTURE', url: '/api/v1/lectures/LECTURE_ID', method: 'PUT' },
      { name: 'DELETE_LECTURE', url: '/api/v1/lectures/LECTURE_ID', method: 'DELETE' },



      /**
       * Courses
       */
      { name: 'LOAD_ALL_COURSES', url: '/api/v1/courses', method: 'GET' },
      { name: 'UPDATE_COURSE', url: '/api/v1/courses/COURSE_ID', method: 'PUT' },
      { name: 'GET_COURSE', url: '/api/v1/courses/COURSE_ID', method: 'GET' },
      { name: 'CREATE_COURSE', url: '/api/v1/courses', method: 'POST' },
      { name: 'DELETE_COURSE', url: '/api/v1/courses/COURSE_ID', method: 'DELETE' },
      { name: 'LOAD_ALL_LECTURES', url: '/api/v1/lectures', method: 'GET' },

      /*Batches*/
      { name: 'LOAD_ALL_BATCHES', url: '/api/v1/batches', method: 'GET' },
      { name: 'UPDATE_BATCH', url: '/api/v1/batches/BATCH_ID', method: 'PUT' },
      { name: 'CREATE_BATCH', url: '/api/v1/batches', method: 'POST' },
      { name: 'DELETE_BATCH', url: '/api/v1/batches/BATCH_ID', method: 'DELETE' },
      { name: 'ASSIGN_BATCH_STUDENTS', url: '/api/v1/batches/BATCH_ID/assign', method: 'POST' },
      { name: 'GET_ALL_BATCH_STUDENTS', url: '/api/v1/batches/BATCH_ID/students', method: 'GET' },
      { name: 'DELETE_ASSIGNED_STUDENT', url: '/api/v1/batches/unassign/STUDENT_ID', method: 'DELETE' },
      { name: 'GET_UNASSIGN_STUDENTS', url: '/api/v1/batches/BATCH_ID/students/unassigned', method: 'GET' },
      

      /**
       * UPLOAD STUDENT PROFILE PICTURE
       */
      { name: 'UPLOAD_IMAGE', url: '/api/v1/resources', method: 'POST' },
      { name: 'VIEW_IMAGE', url: '/api/v1/resources/', method: 'GET' },

      /**
       * complete registration
       */
      { name: 'COMPLETE_REGISTRATION', url: '/api/v1/students/STUDENT_ID/registration/complete', method: 'POST' },

      /**
       * Course Attendance
       */
      { name: 'GET_BATCH_ATTENDANCE', url: '/api/v1/batches/BATCH_ID/attendance', method: 'GET' },
      { name: 'SAVE_BATCH_ATTENDANCE', url: '/api/v1/batches/BATCH_ID/attendance', method: 'POST' },

      /**
       * exams
       */
      { name: 'LOAD_ALL_EXAMS', url: '/api/v1/exams/batches/BATCH_ID', method: 'GET' },
      { name: 'ADD_MARKS', url: '/api/v1/exams/EXAM_ID/marks', method: 'POST' },
      { name: 'SAVE_EXAMS', url: '/api/v1/exams/batches/BATCH_ID', method: 'POST' },
      { name: 'LOAD_EXAM', url: '/api/v1/exams/EXAM_ID', method: 'GET' },   
      { name: 'UPDATE_EXAM', url: '/api/v1/exams/EXAM_ID', method: 'PUT' },
      { name: 'COMPLETE_EXAM', url: '/api/v1/exams/EXAM_ID/complete', method: 'PUT' },      


      /**
       * Results
       */
      
      { name: 'LOAD_ALL_STUDENTS', url: '/api/v1/batches/BATCH_ID/students', method: 'GET' },
      { name: 'GET_STUDENT_RESULT', url: '/api/v1/exams/EXAM_ID/student/STUDENT_ID/marks', method: 'GET' },
      { name: 'GET_BATCH_RESULT', url: '/api/v1/exams/EXAM_ID/marks', method: 'GET' },


      /** UPLOAD STUDENT PROFILE PICTURE
      */

      { name: 'UPLOAD_IMAGE', url: '/api/v1/resources', method: 'POST' },
      { name: 'VIEW_IMAGE', url: '/api/v1/resources/', method: 'GET' },

      /**
      * complete registration
      */

      { name: 'COMPLETE_REGISTRATION', url: '/api/v1/students/STUDENT_ID/registration/complete', method: 'POST' },



      /**
      * Staff
      */

      { name: 'CREATE_ROLES', url: '/api/v1/roles', method: 'POST' },
      { name: 'GET_ALL_ROLES', url: '/api/v1/roles', method: 'GET' },
      { name: 'DELETE_ROLE', url: '/api/v1/roles/ROLE_ID', method: 'DELETE' },
      { name: 'UPDATE_ROLE', url: '/api/v1/roles/ROLE_ID', method: 'PUT' },
      { name: 'GET_ALL_PERMISSIONS', url: '/api/v1/permissions', method: 'GET' },
      { name: 'ADD_STAFF', url: '/api/v1/staff', method: 'POST' },
      { name: 'GET_ALL_STAFF', url: '/api/v1/staff', method: 'GET' },
      { name: 'DELETE_STAFF', url: '/api/v1/staff/STAFF_ID', method: 'DELETE' },
      { name: 'GET_ROLE', url: '/api/v1/roles/ROLE_ID', method: 'GET' },
      { name: 'GET_STAFF', url: '/api/v1/staff/STAFF_ID', method: 'GET' },
      { name: 'UPDATE_STAFF', url: '/api/v1/staff/STAFF_ID', method: 'PUT' },


      /**
       * Assingment
       */

       {name: 'CREATE_ASSIGNMENT', url: '/api/v1/BATCH_ID/assignments', method: 'POST' },
       { name: 'GET_ALL_ASSIGNMENTS', url: '/api/v1/BATCH_ID/assignments', method: 'GET' },
       { name: 'UPDATE_ASSIGNMENT', url: '/api/v1/assignment/ASSIGNMENT_ID', method: 'PUT' },
       { name: 'GET_ASSIGNMENT', url: '/api/v1/assignment/ASSIGNMENT_ID', method: 'GET' },
       { name: 'UPDATE_ASSINGMENT_APPROVAL', url: '/api/v1/student/assignment/ASSIGNMENT_ID', method: 'PUT' },
       
       
       /**
        * Time Table
        */  
        {name: 'GET_ASSIGN_PERIODS', url: '/api/v1/batches/BATCH_ID/timetable', method: 'GET' },
        {name: 'ASSIGN_PERIOD', url: '/api/v1/batches/BATCH_ID/timetable', method: 'POST' },

    ];
  }
}
