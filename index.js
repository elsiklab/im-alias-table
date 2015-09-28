var utils = require('./js/util');


// check query params
var param=utils.getParameterByName('gene_id');
if(param) {
    $('#gene_id').val(param);
    runQuery(param);
}



function runQuery(query) {

    var element = $('#my-id');
    var service = {root: 'http://www.bovinegenome.org/bovinemine'};
    
    imtables.configure({TableCell: {PreviewTrigger: 'click'}});
    imtables.configure('TableResults.CacheFactor', 20);

    imtables.loadTable(
        element,
        {start: 0, size: 25},
        {service: service, query: query}
    ).then(
        function handleTable (table) {
            $("#message").html("Powered by <a href='http://bovinegenome.org/bovinemine/'>BovineMine</a>");
        },
        function reportError (error) { console.error('Could not load table', error); }
    );
}

$("form").submit(function() {
    var gene_id = $('#gene_id').val();
    var source="Ensembl-Gene-set";
    if(!gene_id) {
        gene_id=$('#ens_gene_id').val();
        source="RefSeq-data-set";
    }
    var query={
        "model":{"name":"genomic"},
        "select":[
            "Gene.primaryIdentifier",
            "Gene.secondaryIdentifier",
            "Gene.symbol",
            "Gene.name",
            "Gene.source",
            "Gene.alias.primaryIdentifier",
            "Gene.alias.source"
        ],
        "constraintLogic":"A and B",
        "orderBy":[{"Gene.primaryIdentifier":"ASC"}],
        "where":[
            {"path":"Gene.primaryIdentifier","op":"=","value":gene_id,code:"A"},
            {"path":"Gene.alias.source","op":"=","value":source,code:"B"}
        ]
    };
    runQuery(query);
    return false;
});


$("#ens_all").on('click',function() {
    var query={
        "model":{"name":"genomic"},
        "select":[
            "Gene.primaryIdentifier",
            "Gene.secondaryIdentifier",
            "Gene.symbol",
            "Gene.name",
            "Gene.source",
            "Gene.alias.primaryIdentifier",
            "Gene.alias.source"
        ],
        "orderBy":[{"Gene.primaryIdentifier":"ASC"}],
        "where":[{"path":"Alias.source","op":"=","value":"RefSeq-data-set"}]
    };
    runQuery(query);
    return false;
});



$("#ncbi_all").on('click',function() {
    var query={
        "model":{"name":"genomic"},
        "select":[
            "Gene.primaryIdentifier",
            "Gene.secondaryIdentifier",
            "Gene.symbol",
            "Gene.name",
            "Gene.source",
            "Gene.alias.primaryIdentifier",
            "Gene.alias.source"
        ],
        "orderBy":[{"Gene.primaryIdentifier":"ASC"}],
        "where":[{"path":"Alias.source","op":"=","value":"Ensembl-Gene-set"}]
    };
    runQuery(query);
    return false;
});
