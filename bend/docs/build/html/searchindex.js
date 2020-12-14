Search.setIndex({docnames:["api","api.migrations","explanation","explanation.relationships","explanation.relationships.conceptmodel","explanation.relationships.vsm","index","manage","modules","server","tests","tests.api","tests.explanation"],envversion:{"sphinx.domains.c":2,"sphinx.domains.changeset":1,"sphinx.domains.citation":1,"sphinx.domains.cpp":3,"sphinx.domains.index":1,"sphinx.domains.javascript":2,"sphinx.domains.math":2,"sphinx.domains.python":2,"sphinx.domains.rst":2,"sphinx.domains.std":1,sphinx:56},filenames:["api.rst","api.migrations.rst","explanation.rst","explanation.relationships.rst","explanation.relationships.conceptmodel.rst","explanation.relationships.vsm.rst","index.rst","manage.rst","modules.rst","src.rst","tests.rst","tests.api.rst","tests.explanation.rst"],objects:{"":{api:[0,0,0,"-"],explanation:[2,0,0,"-"],manage:[7,0,0,"-"],server:[9,0,0,"-"],tests:[10,0,0,"-"]},"api.apps":{ApiConfig:[0,1,1,""]},"api.apps.ApiConfig":{name:[0,2,1,""]},"api.migrations":{"0001_initial":[1,0,0,"-"]},"api.migrations.0001_initial":{Migration:[1,1,1,""]},"api.migrations.0001_initial.Migration":{dependencies:[1,2,1,""],initial:[1,2,1,""],operations:[1,2,1,""]},"api.models":{Artifact:[0,1,1,""],ArtifactType:[0,1,1,""],DatasetMeta:[0,1,1,""],Trace:[0,1,1,""]},"api.models.Artifact":{DoesNotExist:[0,3,1,""],MultipleObjectsReturned:[0,3,1,""],dataset:[0,2,1,""],dataset_id:[0,2,1,""],id:[0,2,1,""],name:[0,2,1,""],objects:[0,2,1,""],source:[0,2,1,""],target:[0,2,1,""],text:[0,2,1,""],traces:[0,2,1,""],type:[0,2,1,""],type_id:[0,2,1,""]},"api.models.ArtifactType":{DoesNotExist:[0,3,1,""],MultipleObjectsReturned:[0,3,1,""],artifact_set:[0,2,1,""],name:[0,2,1,""],objects:[0,2,1,""]},"api.models.DatasetMeta":{DoesNotExist:[0,3,1,""],MultipleObjectsReturned:[0,3,1,""],artifact_set:[0,2,1,""],id:[0,2,1,""],name:[0,2,1,""],objects:[0,2,1,""]},"api.models.Trace":{DoesNotExist:[0,3,1,""],MultipleObjectsReturned:[0,3,1,""],artifact_set:[0,2,1,""],id:[0,2,1,""],objects:[0,2,1,""],source:[0,2,1,""],source_id:[0,2,1,""],target:[0,2,1,""],target_id:[0,2,1,""]},"api.serializers":{ArtifactSerializer:[0,1,1,""],CreatableSlugRelatedField:[0,1,1,""],DatasetSerializer:[0,1,1,""],NestedArtifactSerializer:[0,1,1,""],ProjectSerializer:[0,1,1,""],TraceSerializer:[0,1,1,""],create_object:[0,5,1,""]},"api.serializers.ArtifactSerializer":{Meta:[0,1,1,""]},"api.serializers.ArtifactSerializer.Meta":{fields:[0,2,1,""],model:[0,2,1,""]},"api.serializers.CreatableSlugRelatedField":{to_internal_value:[0,4,1,""]},"api.serializers.DatasetSerializer":{Meta:[0,1,1,""]},"api.serializers.DatasetSerializer.Meta":{fields:[0,2,1,""],model:[0,2,1,""]},"api.serializers.NestedArtifactSerializer":{Meta:[0,1,1,""]},"api.serializers.NestedArtifactSerializer.Meta":{fields:[0,2,1,""],model:[0,2,1,""]},"api.serializers.ProjectSerializer":{create:[0,4,1,""],to_internal_value:[0,4,1,""],to_representation:[0,4,1,""],update:[0,4,1,""]},"api.serializers.TraceSerializer":{Meta:[0,1,1,""],to_internal_value:[0,4,1,""]},"api.serializers.TraceSerializer.Meta":{fields:[0,2,1,""],model:[0,2,1,""]},"api.views":{ApplicationError:[0,1,1,""],ProjectViewSet:[0,1,1,""],get_explanation:[0,5,1,""],has_params:[0,5,1,""],require_query_params:[0,5,1,""],search_artifacts:[0,5,1,""]},"api.views.ProjectViewSet":{queryset:[0,2,1,""],serializer_class:[0,2,1,""]},"explanation.relationships":{conceptmodel:[4,0,0,"-"],vsm:[5,0,0,"-"]},"explanation.relationships.conceptmodel":{ConceptModel:[4,0,0,"-"],ConceptModelRelationships:[4,0,0,"-"]},"explanation.relationships.conceptmodel.ConceptModel":{ConceptModel:[4,1,1,""],get_word_node:[4,5,1,""]},"explanation.relationships.conceptmodel.ConceptModel.ConceptModel":{add_concepts:[4,4,1,""],contains_vertex:[4,4,1,""],get_neighborhood:[4,4,1,""],get_path:[4,4,1,""],get_path_for_all:[4,4,1,""],get_word_relationships:[4,4,1,""]},"explanation.relationships.conceptmodel.ConceptModelRelationships":{add_concept_families:[4,5,1,""],add_relationships_to_word_descriptors:[4,5,1,""],attach_relationship_ids_to_word_descriptors:[4,5,1,""],get_concept_model_for_dataset:[4,5,1,""],get_relationships_for_concept_model:[4,5,1,""]},"explanation.relationships.vsm":{CalculateSimilarityMatrix:[5,0,0,"-"],VSMRelationships:[5,0,0,"-"]},"explanation.relationships.vsm.CalculateSimilarityMatrix":{calculate_similarity_matrix:[5,5,1,""],calculate_similarity_matrix_from_term_frequencies:[5,5,1,""],calculate_similarity_matrix_lsa:[5,5,1,""],create_term_frequency_matrix:[5,5,1,""]},"explanation.relationships.vsm.VSMRelationships":{add_relationship_ids:[5,5,1,""],add_root_relationships:[5,5,1,""],create_word_similarity_dictionary:[5,5,1,""],get_related_words:[5,5,1,""],get_vsm_weights:[5,5,1,""]},"server.urls":{OptionalSlashRouter:[9,1,1,""]},"tests.Data":{DataBuilder:[10,1,1,""],create_dataset:[10,5,1,""],create_project:[10,5,1,""],optional_builder_method:[10,5,1,""]},"tests.Data.DataBuilder":{artifact_a:[10,2,1,""],artifact_a_name:[10,2,1,""],artifact_a_text:[10,2,1,""],artifact_a_type:[10,2,1,""],artifact_b:[10,2,1,""],artifact_b_name:[10,2,1,""],create_empty_dataset:[10,4,1,""],create_project:[10,4,1,""],dataset:[10,2,1,""],dataset_id:[10,2,1,""],dataset_name:[10,2,1,""],trace:[10,2,1,""],with_artifact:[10,4,1,""],with_artifact_a:[10,4,1,""],with_artifact_b:[10,4,1,""],with_artifacts:[10,4,1,""],with_trace:[10,4,1,""]},"tests.api":{TestSerialization:[11,0,0,"-"]},"tests.api.TestSerialization":{TestTraceSerializer:[11,1,1,""]},"tests.api.TestSerialization.TestTraceSerializer":{test_artifact_serializer:[11,4,1,""],test_cannot_create_artifact_duplicates:[11,4,1,""],test_create_empty_dataset:[11,4,1,""],test_integration:[11,4,1,""],test_trace_serializer:[11,4,1,""]},"tests.explanation":{TestCleanDoc:[12,0,0,"-"],TestConceptModel:[12,0,0,"-"],TestQuery:[12,0,0,"-"],TestRootFamilies:[12,0,0,"-"],TestSearch:[12,0,0,"-"],TestTraceExplanation:[12,0,0,"-"],TestUtil:[12,0,0,"-"]},"tests.explanation.TestCleanDoc":{TestCleanDoc:[12,1,1,""]},"tests.explanation.TestCleanDoc.TestCleanDoc":{runTest:[12,4,1,""],test_clean_doc_basic:[12,4,1,""],test_get_camel_case_words_code:[12,4,1,""],test_get_camel_case_words_single_acronym:[12,4,1,""],test_get_camel_case_words_with_acronym:[12,4,1,""],test_get_words_in_string_doc:[12,4,1,""],test_get_words_in_string_doc_code:[12,4,1,""],test_remove_non_alphanumeric:[12,4,1,""],test_remove_stop_words:[12,4,1,""],test_separate_camel_case_ec_example:[12,4,1,""],test_separate_camel_case_none_found:[12,4,1,""],test_separate_chained_calls:[12,4,1,""],test_stem_doc:[12,4,1,""],test_to_lower:[12,4,1,""]},"tests.explanation.TestConceptModel":{TestConceptModel:[12,1,1,""]},"tests.explanation.TestConceptModel.TestConceptModel":{concept_model:[12,2,1,""],runTest:[12,4,1,""],test_basic:[12,4,1,""],test_empty:[12,4,1,""],test_ex_test_dataset:[12,4,1,""],test_multiple_words:[12,4,1,""]},"tests.explanation.TestQuery":{TestQuery:[12,1,1,""]},"tests.explanation.TestQuery.TestQuery":{runTest:[12,4,1,""],test_artifact_body:[12,2,1,""],test_basic_filter:[12,4,1,""],test_combine_negative:[12,4,1,""],test_combined_filter:[12,4,1,""],test_exact_filter:[12,4,1,""]},"tests.explanation.TestRootFamilies":{TestRootFamilies:[12,1,1,""]},"tests.explanation.TestRootFamilies.TestRootFamilies":{runTest:[12,4,1,""],test_add_root_families:[12,4,1,""],test_create_word_similarity_dictionary:[12,4,1,""],test_create_word_similarity_dictionary_cutoff:[12,4,1,""],test_create_word_similarity_dictionary_normalize:[12,4,1,""],test_get_vsm_weights:[12,4,1,""]},"tests.explanation.TestSearch":{TestSearch:[12,1,1,""],get_ids:[12,5,1,""]},"tests.explanation.TestSearch.TestSearch":{runTest:[12,4,1,""],test_empty_search:[12,4,1,""],test_search_for_related_artifacts:[12,4,1,""],test_search_for_related_artifacts_with_duplicates:[12,4,1,""],test_search_source:[12,4,1,""]},"tests.explanation.TestTraceExplanation":{TestTraceExplanation:[12,1,1,""]},"tests.explanation.TestTraceExplanation.TestTraceExplanation":{test_get_trace_information:[12,4,1,""]},"tests.explanation.TestUtil":{TestUtil:[12,1,1,""]},"tests.explanation.TestUtil.TestUtil":{runTest:[12,4,1,""],test_export_as_dict:[12,4,1,""],test_export_as_dict_with_obj_as_values:[12,4,1,""]},api:{admin:[0,0,0,"-"],apps:[0,0,0,"-"],migrations:[1,0,0,"-"],models:[0,0,0,"-"],serializers:[0,0,0,"-"],tests:[0,0,0,"-"],views:[0,0,0,"-"]},explanation:{Paths:[2,0,0,"-"],relationships:[3,0,0,"-"]},manage:{main:[7,5,1,""]},server:{asgi:[9,0,0,"-"],settings:[9,0,0,"-"],urls:[9,0,0,"-"],wsgi:[9,0,0,"-"]},tests:{Data:[10,0,0,"-"],TestRunner:[10,0,0,"-"],api:[11,0,0,"-"],explanation:[12,0,0,"-"]}},objnames:{"0":["py","module","Python module"],"1":["py","class","Python class"],"2":["py","attribute","Python attribute"],"3":["py","exception","Python exception"],"4":["py","method","Python method"],"5":["py","function","Python function"]},objtypes:{"0":"py:module","1":"py:class","2":"py:attribute","3":"py:exception","4":"py:method","5":"py:function"},terms:{"0001_initi":[0,8],"100":5,"3d10":0,"4738":0,"8c4b":0,"93eb6200":0,"case":[5,12],"class":[0,1,4,5,9,10,11,12],"float":5,"int":5,"return":[4,5],"true":[1,5],For:[5,9],The:[4,5],Will:5,accessor:0,add:[4,5],add_concept:4,add_concept_famili:4,add_relationship_id:5,add_relationships_to_word_descriptor:4,add_root_relationship:5,addfield:1,admin:[8,9],administr:7,adpat:4,alia:0,all:4,allow:5,also:5,alteruniquetogeth:1,anoth:5,api:[6,8,10],apiconfig:0,app:8,app_label:1,app_modul:0,app_nam:0,appconfig:0,applic:9,applicationerror:0,arg:0,artifact:[0,1,12],artifact_a:10,artifact_a_nam:10,artifact_a_text:10,artifact_a_typ:10,artifact_b:10,artifact_b_nam:10,artifact_data:10,artifact_set:0,artifactseri:0,artifacttyp:[0,1],asgi:8,attach_relationship_ids_to_word_descriptor:4,base:[0,1,4,9,10,11,12],below:0,between:5,built:0,calc:5,calcul:5,calculate_similarity_matrix:5,calculate_similarity_matrix_from_term_frequ:5,calculate_similarity_matrix_lsa:5,calculatesimilaritymatrix:[2,3],callabl:9,charfield:1,child:0,children:0,col:5,column:5,com:9,command:7,compon:5,concept:4,concept_model:[4,12],conceptmodel:[2,3,12],conceptmodelrelationship:[2,3],config:[0,9],contain:[0,5],contains_vertex:4,content:8,core:0,cosin:5,countmatrix:5,creat:[0,5],creatableslugrelatedfield:0,create_dataset:10,create_empty_dataset:10,create_forward_many_to_many_manag:0,create_object:0,create_project:10,create_term_frequency_matrix:5,create_word_similarity_dictionari:5,createmodel:1,csr:5,csr_matrix:5,cutoff:[4,5],data:[0,8],databuild:10,dataset:[0,1,4,5,10],dataset_id:[0,10],dataset_nam:[4,10],datasetmeta:[0,1,10],datasetseri:0,datatyp:0,decomposit:5,decor:0,defaultrout:9,defer:0,defin:0,deleg:0,depend:1,deploy:9,descriptor:[4,5],design:5,dict:[0,5],dictionari:5,dimens:5,distanc:5,distancematrix:5,django:[0,1,7,9,11],djangoproject:9,doc:[5,9],document:5,doe:0,doesnotexist:0,drone:10,dynam:0,each:5,edg:4,edit:0,element:5,empti:4,end:4,everi:5,exampl:0,except:0,execut:0,exist:[0,4],explan:[6,8,10],expos:9,f974f4ce7492:0,fals:5,featur:5,field:[0,1],file:9,first:[0,5],foreignkei:[0,1],format:4,forward:0,forwardmanytoonedescriptor:0,forwardonetoonedescriptor:0,frequenc:5,from:[0,4,5],full:9,gener:9,get_concept_model_for_dataset:4,get_explan:0,get_id:12,get_neighborhood:4,get_path:4,get_path_for_al:4,get_related_word:5,get_relationships_for_concept_model:4,get_vsm_weight:5,get_word_nod:4,get_word_relationship:4,given:[0,5],greater:5,handler:0,has_param:0,have:5,hello:10,howto:9,http:[0,9],httpresponsebadrequest:0,idf:5,implement:0,includ:4,incom:0,index:[5,6],inform:9,initi:1,instanc:0,its:5,kei:5,kwarg:0,last_word:4,length:4,level:9,line:7,link:5,list:[0,4,5,9],listof:5,load:0,logger:5,lower:5,lsa:5,main:7,manag:[0,6,8],mani:0,manytomanydescriptor:0,manytomanyfield:[0,1],map:5,matric:5,matrix:5,max_featur:5,maxim:4,mean:5,messag:0,meta:0,methodnam:[11,12],migrat:[0,8],min:5,model:[1,4,5,8,10],model_nam:1,modelseri:0,modelviewset:0,modul:[6,8],more:9,morpholog:5,most:0,multipleobjectsreturn:0,name:[0,1,9,10],nativ:0,nestedartifactseri:0,non:5,none:[5,10],normal:5,note:5,number:5,object:[0,4,10,12],objectdoesnotexist:0,one:[0,5],onli:5,oper:1,option:1,optional_builder_method:10,optionalslashrout:9,order:1,our:5,packag:[6,8],page:6,pair:5,param:[0,4,5],paramet:5,parent:0,path:[4,8],persist:4,pizza:0,point:4,possibl:4,primit:0,project:9,projectseri:0,projectviewset:0,put:5,queri:0,queryset:0,raw_a:5,raw_b:5,read:0,record:5,reduc:5,ref:9,relat:[0,1],related_nam:0,relationship:[2,8,12],repres:5,request:0,requir:[5,10],require_query_param:0,required_param:0,respons:0,rest_framework:[0,9],result:5,return_vector:5,revers:0,reversemanytoonedescriptor:0,root:5,root_target:5,router:9,row:5,run:7,runtest:[11,12],satisfi:5,scale:5,scheme:5,scipi:5,score:5,search:6,search_artifact:0,second:5,see:9,self:0,serial:8,serializer_class:0,server:6,set:[5,8],side:0,similar:5,similarity_matrix:5,similaritymatrix:5,simpl:4,singular:5,sklearn:5,slugrelatedfield:0,some:5,sourc:[0,1,4],source_id:0,source_nam:10,source_root_word:5,source_typ:10,source_word:4,spars:5,start:4,startproject:9,state:12,stem:5,str:[0,4,5],string:5,subclass:0,submodul:[3,8],subpackag:8,target:[0,1,4],target_id:0,target_nam:10,target_root_word:5,target_typ:10,target_word:4,task:7,term:[4,5],termfrequencymatric:5,test:[6,8],test_add_root_famili:12,test_artifact_bodi:12,test_artifact_seri:11,test_bas:12,test_basic_filt:12,test_cannot_create_artifact_dupl:11,test_clean_doc_bas:12,test_combine_neg:12,test_combined_filt:12,test_create_empty_dataset:11,test_create_word_similarity_dictionari:12,test_create_word_similarity_dictionary_cutoff:12,test_create_word_similarity_dictionary_norm:12,test_empti:12,test_empty_search:12,test_ex_test_dataset:12,test_exact_filt:12,test_export_as_dict:12,test_export_as_dict_with_obj_as_valu:12,test_get_camel_case_words_cod:12,test_get_camel_case_words_single_acronym:12,test_get_camel_case_words_with_acronym:12,test_get_trace_inform:12,test_get_vsm_weight:12,test_get_words_in_string_doc:12,test_get_words_in_string_doc_cod:12,test_integr:11,test_multiple_word:12,test_remove_non_alphanumer:12,test_remove_stop_word:12,test_search_for_related_artifact:12,test_search_for_related_artifacts_with_dupl:12,test_search_sourc:12,test_separate_camel_case_ec_exampl:12,test_separate_camel_case_none_found:12,test_separate_chained_cal:12,test_stem_doc:12,test_to_low:12,test_trace_seri:11,testcas:[11,12],testcleandoc:[8,10],testconceptmodel:[8,10],testqueri:[8,10],testrootfamili:[8,10],testrunn:8,testsearch:[8,10],testseri:[8,10],testtraceexplan:[8,10],testtraceseri:11,testutil:[8,10],text:[0,1,10],tf_a:5,tf_b:5,than:5,thi:[0,4,5,9],time:0,to_internal_valu:0,to_represent:0,top:0,topic:9,trace:[0,1,10],trace_relationship:5,traceexplan:[4,5],traceinform:[4,5],traceseri:0,transform:[0,5],transitiosn:12,tsv:4,tsv_path:4,type:[0,1,10],type_id:0,unique_togeth:1,unittest:12,updat:0,upper:5,url:8,used:5,user:0,using:9,util:7,uuidfield:1,valid_root:5,validated_data:0,valu:[0,5,9],vari:5,variabl:9,verifi:0,vertex_nam:4,vertic:4,via:[0,5],view:8,viewset:0,vocabulari:5,vsm:[2,3],vsmrelationship:[2,3],w2_list:4,weight:5,weight_cutoff:5,when:0,where:5,which:5,whose:5,with_artifact:10,with_artifact_a:10,with_artifact_b:10,with_trac:10,word:[4,5],word_descriptor:5,word_index_map:5,word_root:5,worddescriptor:[4,5],world:10,wrapper:0,wsgi:8,zero:5},titles:["api package","api.migrations package","explanation package","explanation.relationships package","explanation.relationships.conceptmodel package","explanation.relationships.vsm package","Welcome to TraceLinkExplainer\u2019s documentation!","manage module","server","src package","tests package","tests.api package","tests.explanation package"],titleterms:{"0001_initi":1,admin:0,api:[0,1,11],app:0,asgi:9,calculatesimilaritymatrix:5,conceptmodel:4,conceptmodelrelationship:4,content:[0,1,2,3,4,5,9,10,11,12],data:10,document:6,explan:[2,3,4,5,12],indic:6,manag:7,migrat:1,model:0,modul:[0,1,2,3,4,5,7,9,10,11,12],packag:[0,1,2,3,4,5,9,10,11,12],path:2,relationship:[3,4,5],serial:0,server:[8,9],set:9,submodul:[0,1,2,4,5,9,10,11,12],subpackag:[0,2,3,10],tabl:6,test:[0,10,11,12],testcleandoc:12,testconceptmodel:12,testqueri:12,testrootfamili:12,testrunn:10,testsearch:12,testseri:11,testtraceexplan:12,testutil:12,tracelinkexplain:6,url:9,view:0,vsm:5,vsmrelationship:5,welcom:6,wsgi:9}})