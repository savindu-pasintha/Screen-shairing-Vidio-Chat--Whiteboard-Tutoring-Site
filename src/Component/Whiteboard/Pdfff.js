import React, { useState, useRef } from 'react';
import { usePdf } from '@mikecousins/react-pdf';

//import pdfjsLib from '../Whiteboard/pdf reading library/build/pdf*';

const Pdfff = () => {
    const [base, setBase] = useState("");
    const [page, setPage] = useState(1);
    const canvasRef = useRef(null);

    const getFile = (e) => {
        if (e.target.files[0]) {
            var bb = e.target.files;
            console.log(bb);

            var pdfUrl = URL.createObjectURL(bb[0]);

            console.log(pdfUrl);
            
          //base 64 convertion
          var reader = new FileReader();
          reader.readAsBinaryString(bb[0]);

          reader.onload = function(){
            console.log(btoa(reader.result));
            setBase(reader.result);
          }
          reader.onerror=function(){
            console.log("error");
          }
         
        }
    }
    const { pdfDocument, pdfPage } = usePdf({
        file: 'savindupasingth.pdf',
        page,
        canvasRef,
    });
    return (
        <div>
            {!pdfDocument && <span>Loading...</span>}
            <form>
                <input type="file" accept=".pdf" onClick={getFile} />
            {base}
            </form>
            <canvas ref={canvasRef} />
            {Boolean(pdfDocument && pdfDocument.numPages) && (
                <nav>
                    <ul className="pager">
                        <li className="previous">
                            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                                Previous
                            </button>
                        </li>
                        <li className="next">
                            <button
                                disabled={page === pdfDocument.numPages}
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}

export default Pdfff;
