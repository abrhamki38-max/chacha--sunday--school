import React, {createContext,useContext,useEffect,useMemo,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {toGeez} from '../utils/geez';

export type PersonType='student'|'teacher'|'parent'|'guest';
export interface Parent {id:string;number:number;code:string;name:string;phone:string;address:string;photo:string|null}
export interface Student {id:string;number:number;code:string;name:string;className:string;birthDate:string;phone:string;photo:string|null;parentId:string;status:'active'|'inactive';registeredAt:string;gender?:string;previousSchool?:string;talent?:string}
export interface Teacher {id:string;number:number;code:string;name:string;subject:string;phone?:string}
export interface Attendance {id:string;date:string;personId:string;personType:PersonType;status:'present'|'absent'|'permission';reason?:string;ownerId:string}
export interface BookLoan {id:string;borrowerName:string;personType:string;personId?:string;className:string;bookTitle:string;borrowedAt:string;returnedAt?:string;dailyFee:number;paid:boolean;returned:boolean;ownerId:string}
export interface Grade {id:string;studentId:string;className:string;subject:string;assessment:string;score:number;maxScore:number;term:string;ownerId:string;updatedAt:string}
export interface Folder {id:string;className:string;name:string;ownerId:string;createdAt:string}
export interface FolderFile {id:string;folderId:string;name:string;kind:'image'|'document'|'audio'|'video'|'other';uri:string;createdAt:string}
export interface Plan {id:string;className:string;title:string;description:string;dueDate:string;progress:number;ownerId:string;updatedAt:string}
export interface SchoolConfig {schoolName:string;logoUri:string;phone:string;absenceThreshold:number;absenceMessage:string;dailyLoanFee:number;lateFine:number;presentColor:string;absentColor:string;permissionColor:string;nonMemberColor:string}
export interface Store {students:Student[];parents:Parent[];teachers:Teacher[];attendance:Attendance[];loans:BookLoan[];classes:string[];grades:Grade[];folders:Folder[];folderFiles:FolderFile[];plans:Plan[];config:SchoolConfig}
const defaultConfig:SchoolConfig={schoolName:'ጫጫ ቅዱስ ገብርኤል ሰንበት ትምህርት ቤት',logoUri:'',phone:'',absenceThreshold:3,absenceMessage:'ልጅዎ በተደጋጋሚ ከትምህርት ቀርቷል።',dailyLoanFee:10,lateFine:0,presentColor:'#DDF4E4',absentColor:'#FCE1E4',permissionColor:'#FFF0D3',nonMemberColor:'#E9E5FA'};
const initialClasses=['ቅድመ መደበኛ ሀ','ቅድመ መደበኛ ለ','1ኛ ክፍል','2ኛ ክፍል','3ኛ ክፍል','4ኛ ክፍል','5ኛ ክፍል','6ኛ ክፍል','7ኛ ክፍል','8ኛ ክፍል','ሥራ ኹለተኛ ክፍል','የመዝሙር ክፍል'];
const defaults:Store={students:[],parents:[],teachers:[],attendance:[],loans:[],classes:initialClasses,grades:[],folders:[],folderFiles:[],plans:[],config:defaultConfig};
const KEY='chacha_admin_store_v3';const id=()=>`${Date.now().toString(36)}${Math.random().toString(36).slice(2,8)}`;const code=(p:string,n:number)=>`${p}-${toGeez(n)}`;
interface Ctx extends Store {ready:boolean;updateStore:(fn:(s:Store)=>Store)=>void;saveStudent:(x:Partial<Student>&{name:string;className:string})=>string;deleteStudent:(id:string)=>void}
const C=createContext<Ctx|null>(null);
export const DataProvider:React.FC<React.PropsWithChildren>=({children})=>{
 const [data,setData]=useState<Store>(defaults);const [ready,setReady]=useState(false);
 useEffect(()=>{let live=true;(async()=>{try{const raw=await AsyncStorage.getItem(KEY);if(raw&&live){const v=JSON.parse(raw);setData({...defaults,...v,config:{...defaultConfig,...v.config},classes:Array.isArray(v.classes)?v.classes:initialClasses});}}catch(e){console.warn('Data load failed',e);}finally{if(live)setReady(true);}})();return()=>{live=false};},[]);
 useEffect(()=>{if(ready)AsyncStorage.setItem(KEY,JSON.stringify(data)).catch(e=>console.warn('Data save failed',e));},[data,ready]);
 const value=useMemo<Ctx>(()=>({...data,ready,updateStore:fn=>setData(d=>fn(d)),
 saveStudent:x=>{let saved='';setData(d=>{const old=x.id?d.students.find(s=>s.id===x.id):undefined;const n=old?.number??Math.max(1000,...d.students.map(s=>s.number))+1;saved=old?.id??id();const v:Student={id:saved,number:n,code:old?.code??code('ST',n),name:x.name.trim(),className:x.className,birthDate:x.birthDate??'',phone:x.phone??'',photo:x.photo??null,parentId:x.parentId??'',status:x.status??'active',registeredAt:old?.registeredAt??new Date().toISOString(),gender:x.gender,previousSchool:x.previousSchool,talent:x.talent};return {...d,students:old?d.students.map(a=>a.id===old.id?v:a):[v,...d.students]};});return saved;},
 deleteStudent:sid=>setData(d=>({...d,students:d.students.filter(x=>x.id!==sid)}))
 }),[data,ready]);
 return <C.Provider value={value}>{children}</C.Provider>;
};
export const useData=()=>{const v=useContext(C);if(!v)throw new Error('useData must be inside DataProvider');return v;};
