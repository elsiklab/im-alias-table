var imtables = require('im-tables');
var utils = require('./util');


// check query params
var param=utils.getParameterByName('gene_id');
if(param) {
    $('#gene_id').val(param);
    runQuery(param);
}




function runQuery(gene_id) {
    var element = $('#my-id');
    var service = {root: 'http://www.bovinegenome.org/bovinemine'};
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
            {"path":"Gene.primaryIdentifier","op":"=","code":"A","value":gene_id},
            {"path":"Gene.alias.source","op":"=","code":"B","value":"Ensembl-Gene-Set"}
        ]
    };
    // Configure options here, using nested notation
    imtables.configure({TableCell: {PreviewTrigger: 'click'}});
    // Or using path names:
    imtables.configure('TableResults.CacheFactor', 20);

    // Then load the table (or indeed vice-versa, the table
    // will respond to changes in the options)
    imtables.loadTable(
        element, // Could also be a string or a jquery object
        {start: 0, size: 25}, // Can be null - all properties are optional.
        {service: service, query: query} // Can also be an imjs.Query object
    ).then(
        function handleTable (table) { $("#message").html("Powered by <a href='http://bovinegenome.org/bovinemine/'>BovineMine</a>"); },
        function reportError (error) { console.error('Could not load table', error); }
    );
}
function runQueryEnsembl(gene_id) {
    var element = $('#my-id');
    var service = {root: 'http://www.bovinegenome.org/bovinemine'};
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
        "where":[{"path":"Gene.primaryIdentifier","op":"=","code":"A","value":gene_id}]
    }
    // Configure options here, using nested notation
    imtables.configure({TableCell: {PreviewTrigger: 'click'}});
    // Or using path names:
    imtables.configure('TableResults.CacheFactor', 20);

    // Then load the table (or indeed vice-versa, the table
    // will respond to changes in the options)
    imtables.loadTable(
        element, // Could also be a string or a jquery object
        {start: 0, size: 25}, // Can be null - all properties are optional.
        {service: service, query: query} // Can also be an imjs.Query object
    ).then(
        function handleTable (table) { $("#message").html("Powered by <a href='http://bovinegenome.org/bovinemine/'>BovineMine</a>"); },
        function reportError (error) { console.error('Could not load table', error); }
    );
}


$("form").submit(function() {
    var gene_id = $('#gene_id').val();
    if(!gene_id) {
        gene_id=$('#ens_gene_id').val();
        runQueryEnsembl(gene_id);
    }
    else {
        runQuery(gene_id);
    }
    return false;
});

